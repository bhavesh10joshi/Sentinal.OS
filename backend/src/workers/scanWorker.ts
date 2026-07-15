import { Worker , Job } from "bullmq";
import { GoogleGenAI } from "@google/genai";
import prisma from "../Db/Db";
import { runParser } from "../Functions/RunParser";
import { GenerateResponse } from "../GeminiAISDK/AIParsing";
import { CODE_SCAN_QUEUE } from "../Queues/scanQueue";
import { upsertCodeToVectorStore } from "../Utils/VectorStore";
import path from "path";
import dotenv from "dotenv"

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

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
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const scanWorker = new Worker(
    CODE_SCAN_QUEUE , 
    async(job : Job) => {
        const { userId , fileName , codeString} = job.data;

        console.log(`Worker Started working on background job : ${job.id} for file : ${fileName}`);
    
        try{
            if (!job.data || !job.data.codeString) {
                throw new Error("Invalid payload: codeString is empty or undefined.");
            }

            const collections = await runParser(codeString);

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
            await upsertCodeToVectorStore(chunksToVectorize);

            const Response = await GenerateResponse(collections);

            await prisma.scanReport.create({
                data: {
                userId: userId,
                fileName: fileName,
                totalBlocksScanned: collections.length,
                success: true,
                findings: {
                    create: Response.map((item: any) => ({
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
        catch(e)
        {
            console.error(`Worker Encountered Error , for job : ${job.id} error : `, e);
            await prisma.scanReport.create({
                data: {
                userId: userId,
                fileName: fileName,
                totalBlocksScanned: 0,
                success: false
                }
            });
            throw e;
        }
    },
    {connection : workerConnection}
);

export default scanWorker