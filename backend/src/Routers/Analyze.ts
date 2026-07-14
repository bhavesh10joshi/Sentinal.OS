import { Router} from 'express';
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors} from '../StatusCodes/StatusCodes';
import multer from 'multer'; 
import prisma from '../Db/Db';
import scanQueue from '../Queues/scanQueue';
import { queryVectorStore } from '../Utils/VectorQuery';

const storage = multer.memoryStorage();
const upload = multer({
    storage : storage
});

const AnalyzeRouter = Router();

AnalyzeRouter.post("/raw" , async function(req:any , res:any)
{
    const RawCode:string = req.body.RawCode;
    const userId:string = req.body.userId || "anonymous_default_user";

    if(!RawCode)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "No Code entered !"
        });
        return;
    }

    // Generating the parse code for the given code
    try{
        const job = await scanQueue.add("processRawCode", {
            userId : userId , 
            fileName : "Raw Snippet Sandbox" ,
            codeString : RawCode
        }); 

        return res.json({
            success: true,
            message : "Code Snippet accepted into the Queue for Further Execution ." , 
            jobId : job.id
        });
    }
    catch(e)
    {
        console.log("Raw Code uploadind in Queue Failure !");
        res.status(ServerErrors.InternalServerError).json({
            success : false , 
            error : "Internal Server Error Encountered , Completely dropped the execution ." , 
            details : e
        });
        return; 
    }
});
// We will search for codeFile(By this name the sender will atach his/her file)
AnalyzeRouter.post("/file" , upload.single("codeFile") , async function(req:any , res:any)
{
    const userId : string = req.body.userId || "anonymous_default_user";

    try{
        if(!req.file)
        {
            res.status(ServerErrors.InternalServerError).json({
                success : false , 
                error : "No file Found on the recieving end !"
            });
            return;
        }
        // will start to read the file content
        const FileContent : string = req.file.buffer.toString('utf8');
        
        console.log(`Received file: ${req.file.originalname} (${req.file.size} bytes)`);

        const job = await scanQueue.add("processFileCode" , {
            userId : userId , 
            fileName : req.file.originalname , 
            codeString : FileContent
        });

        res.status(SuccessStatusCodes.Success).json({
            success: true,
            message : `File ${req.file.originalname} queued for security verification streaming` , 
            jobId : job.id
        }); 

        return;
    }
    catch(e:any)
    {
        console.log("File Queue Failure encountered !");
        res.status(ServerErrors.InternalServerError).json({
            success : false , 
            error : "Internal server Error Occurred !" , 
            details : e
        });
        return;
    }
});
//Api request for getting the full history of the userId and there scans 
AnalyzeRouter.get("/history" , async function(req:any , res:any)
{
    const userId:string = req.body.userId;
    
    if(!userId)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            success : false , 
            error : "No userId provided by the user in order to track down the previous code scanning requests..."
        });
        return;
    }

    try{
        const fullHistory:any = await prisma.scanReport.findMany({
            where : {
                userId : userId
            },
            orderBy : {
                //To get the full Scanning history in descending order(Newest to older ones)
                createdAt : "desc" 
            },
            include : {
                findings : true
            }
        });

        res.status(SuccessStatusCodes.Success).json({
            success : true , 
            history : fullHistory 
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            success : false ,
            error : "Internal Server Error Occurred !" , 
            details : e 
        });
        return;  
    }
});
// Api endpoint to Know whether the job is completed or still executing in the background 
AnalyzeRouter.get("/status/:jobId" , async function(req:any , res:any)
{
    const { jobId } = req.params;
    
    if(!jobId)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            success : false , 
            message : "JobId was not provided by the user !",
        });
        return;
    }

    try{
        const job =  await scanQueue.getJob(jobId);

        if(!job)
        {
            res.status(ServerErrors.NoServerResponse).json({
                success : false , 
                status : "UNKNOWN" , 
                message : "Job tracking refrences expired or not found within current buffers !" 
            });
            return;
        }
        // This is the job state , tells us what is the state of the job in the queue . States : ("active" | "completed" | "failed" | "waiting" | "delayed")
        const jobState = await job.getState();

        // getting any value that is returned by the background working thread
        const jobResult = job.returnvalue();

        // Job finished processing cleanly
        if (jobState === "completed") {
            return res.json({
                success: true,
                status: "COMPLETED",
                progress: 100,
                result: jobResult
            });
        }

        // The background runtime pipeline encountered a failure
        if (jobState === "failed") {
            return res.json({
                success: false,
                status: "FAILED",
                progress: 0,
                reason: job.failedReason || "Background pipeline dropped execution unexpectedly."
            });
        }

        // Job is still sitting in queue line or currently spinning inside the worker thread
        return res.json({
            success: true,
            status: jobState.toUpperCase(), // Returns "ACTIVE" or "WAITING"
            progress: jobState === "active" ? 50 : 10 // Quick estimations for your frontend loading bar
        });
    } 
    catch(e : any)
    {
        console.error("Telemetry Retrieval Failure: ", e);
        return res.status(500).json({
            success: false,
            error: "Failed to query system telemetry indexes.",
            details: e instanceof Error ? e.message : e
        });
    }
});
// Handling semantic code queries over indexed workspaces(vector search using rag)
AnalyzeRouter.post("/search", async function(req: any, res: any) {
    const { prompt, userId } = req.body;

    if (!prompt || !userId) {
        return res.status(400).json({
            success: false,
            error: "Parameters 'prompt' and 'userId' are strictly required."
        });
    }

    try {
        //Running our semantic search function to extract the 3 closest matches from the database
        const searchResults = await queryVectorStore(userId, prompt, 3);

        return res.json({
            success: true,
            query: prompt,
            results: searchResults
        });

    } catch (e: any) {
        return res.status(500).json({
            success: false,
            error: "Failed to execute semantic codebase query lookup maps.",
            details: e instanceof Error ? e.message : e
        });
    }
});
export default AnalyzeRouter;