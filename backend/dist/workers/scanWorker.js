"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("../Config/redis"));
const Db_1 = __importDefault(require("../Db/Db"));
const RunParser_1 = require("../Functions/RunParser");
const AIParsing_1 = require("../GeminiAISDK/AIParsing");
const scanQueue_1 = require("../Queues/scanQueue");
const scanWorker = new bullmq_1.Worker(scanQueue_1.CODE_SCAN_QUEUE, async (job) => {
    const { userId, fileName, codeString } = job.data;
    console.log(`Worker Started working on background job : ${job.id} for file : ${fileName}`);
    try {
        const collections = await (0, RunParser_1.runParser)(codeString);
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
}, { connection: redis_1.default });
exports.default = scanWorker;
//# sourceMappingURL=scanWorker.js.map