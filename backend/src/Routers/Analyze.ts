import {response, Router} from 'express';
import { runParser } from '../Functions/RunParser';
import { GenerateResponse } from '../GeminiAISDK/AIParsing';
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors} from '../StatusCodes/StatusCodes';
import multer from 'multer'; 
import prisma from '../Db/Db';

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
        const Collections:any = await runParser(RawCode);
        const Response:any = await GenerateResponse(Collections);

        const SavedReport = await prisma.scanReport.create({
            data: {
                userId : userId , 
                fileName: "Raw Snippet SandBox" , 
                totalBlocksScanned : Collections.length ,
                success : true , 
                findings : {
                    create: Response.map((item : any) => ({
                        functionName : item.functionName , 
                        startLine : item.startLine , 
                        endLine : item.endLine , 
                        vulnerabilityFound : item.analysis.vulnerabilityFound , 
                        severity : item.analysis.severity , 
                        issueSummary : item.analysis.issueSummary , 
                        remediationCode : item.analysis.remediationCode
                    }))
                }
            },
            include : {
                findings : true
            } 
        })

        return res.json({
            success: true,
            reportId: SavedReport.id,
            fileName: SavedReport.fileName,
            TotalBlocksScanned: SavedReport.totalBlocksScanned,
            findings: SavedReport.findings
        });
    }
    catch(e)
    {
        console.log("Pipeline Failure : " + e)
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

        // Storing the functions and other attributes in the collection
        const Collections:any = await runParser(FileContent);
        const Response = await GenerateResponse(Collections);

        const SavedReport = await prisma.scanReport.create({
            data : {
                userId : userId ,
                fileName : req.file.originalname , 
                totalBlocksScanned : Collections.length , 
                success : true , 
                findings : {
                    create : Response.map((item : any)=>({
                        functionName: item.functionname || item.functionName,
                        startLine: item.startLine,
                        endLine: item.endLine,
                        vulnerabilityFound: item.analysis.vulnerabilityFound,
                        severity: item.analysis.severity,
                        issueSummary: item.analysis.issueSummary,
                        remediationCode: item.analysis.remediationCode
                    }))
                }
            },
            include: {
                findings: true 
            }           
        });

        res.status(SuccessStatusCodes.Success).json({
            success: true,
            reportId: SavedReport.id,
            fileName: SavedReport.fileName,
            TotalBlocksScanned: SavedReport.totalBlocksScanned,
            findings: SavedReport.finding
        }); 
        return;
    }
    catch(e)
    {
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
})
export default AnalyzeRouter;