"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const genai_1 = require("@google/genai");
const Db_1 = __importDefault(require("../Db/Db"));
const RunParser_1 = require("../Functions/RunParser");
const AIParsing_1 = require("../GeminiAISDK/AIParsing");
const scanQueue_1 = require("../Queues/scanQueue");
const VectorStore_1 = require("../Utils/VectorStore");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
// error checking : are keys still prresent or not
console.log("Checking keys inside execution thread:", {
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasPineconeKey: !!process.env.PINECONE_API_KEY
});
const workerConnection = {
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null
};
// Explicitly instantiate the Google SDK using the authenticated API key config string
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const scanWorker = new bullmq_1.Worker(scanQueue_1.CODE_SCAN_QUEUE, async (job) => {
    const { userId, fileName, codeString } = job.data;
    console.log(`Worker Started working on background job : ${job.id} for file : ${fileName}`);
    try {
        if (!job.data || !job.data.codeString) {
            throw new Error("Invalid payload: codeString is empty or undefined.");
        }
        const collections = await (0, RunParser_1.runParser)(codeString);
        const chunksToVectorize = [{
                id: `${job.data.fileName}#global_scope`,
                code: job.data.codeString,
                metadata: {
                    userId: job.data.userId,
                    fileName: job.data.fileName,
                    language: "typescript"
                }
            }];
        // Hand off the data payload to Pinecone asynchronously
        await (0, VectorStore_1.upsertCodeToVectorStore)(chunksToVectorize);
        const Response = await (0, AIParsing_1.GenerateResponse)(collections);
        await Db_1.default.scanReport.create({
            data: {
                userId: userId,
                fileName: fileName,
                totalBlocksScanned: collections.length,
                success: true,
                findings: {
                    create: Response.map((item) => ({
                        functionName: item.functionname || item.functionName,
                        startLine: item.startLine,
                        endLine: item.endLine,
                        vulnerabilityFound: item.analysis.vulnerabilityFound,
                        severity: item.analysis.severity,
                        issueSummary: item.analysis.issueSummary,
                        remediationCode: item.analysis.remediationCode
                    }))
                }
            }
        });
        console.log(`[Worker] Job ${job.id} finalized and committed to database successfully.`);
        return { success: true };
    }
    catch (e) {
        console.error(`Worker Encountered Error , for job : ${job.id} error : `, e);
        await Db_1.default.scanReport.create({
            data: {
                userId: userId,
                fileName: fileName,
                totalBlocksScanned: 0,
                success: false
            }
        });
        throw e;
    }
}, { connection: workerConnection });
exports.default = scanWorker;
//# sourceMappingURL=scanWorker.js.map