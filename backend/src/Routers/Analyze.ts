import {response, Router} from 'express';
import { runParser } from '../Functions/RunParser';
import { GenerateResponse } from '../GeminiAISDK/AIParsing';
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors} from '../StatusCodes/StatusCodes';
import multer from 'multer'; 

const storage = multer.memoryStorage();
const upload = multer({
    storage : storage
});

const AnalyzeRouter = Router();

AnalyzeRouter.post("/raw" , async function(req:any , res:any)
{
    const RawCode:string = req.body.RawCode;

    if(!RawCode)
    {
        res.status().json({
            msg : "No Code entered !"
        });
        return;
    }

    // Generating the parse code for the given code
    try{
        const Collections:any = await runParser(RawCode);
        const Response:any = await GenerateResponse(Collections);

        res.json({
            success : true , 
            TotalBlocksScanned : Collections.length , 
            findings : Response
        });
        return;
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

        res.status(SuccessStatusCodes.Success).json({
            success : true ,
            filename : req.file.originalname ,
            TotalBlocksScanned : Collections.length , 
            findings : Response
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
export default AnalyzeRouter;