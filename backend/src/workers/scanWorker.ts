import { Worker , Job } from "bullmq";
import redisConnectionOptions from "../Config/redis";
import prisma from "../Db/Db";
import { runParser } from "../Functions/RunParser";
import { GenerateResponse } from "../GeminiAISDK/AIParsing";
import { CODE_SCAN_QUEUE } from "../Queues/scanQueue";

const scanWorker = new Worker(
    CODE_SCAN_QUEUE , 
    async(job : Job) => {
        const { userId , fileName , codeString} = job.data;

        console.log(`Worker Started working on background job : ${job.id} for file : ${fileName}`);
    
        try{

            const collections = await runParser(codeString);
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
    {connection : redisConnectionOptions}
);

export default scanWorker