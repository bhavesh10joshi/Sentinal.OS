// import { runParser } from './Functions/RunParser';
// runParser().catch(err => console.error(err));
import express from "express";
import cors from "cors";
import WebHooksRouter from "./Routers/WebHooks";
import AnalyzeRouter from "./Routers/Analyze";
import helmet from "helmet"
import {rateLimit} from "express-rate-limit"
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin : process.env.FRONTEND_URL || "http://localhost:5173" ,
    methods : ["GET" , "POST" ] , 
    allowedHeaders : ["Content-type" , "Authorization" , "x-user-id"],
    credentials : true
}));

// Using the below rate limiting massive api hit using heavy payloads can be restricted
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended:true , limit:"10mb"}))
 
// Rate Limiting for protecting the server from spam api hitting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minute window tracking
    limit: 100, // Cap each individual IP connection to 100 hits per window
    standardHeaders: 'draft-7', // Return standard rate limit info in headers
    legacyHeaders: false, 
    message: {
        success: false,
        error: "Too many security scan requests originating from this address. Please try again in 15 minutes."
    }
});
// Above rate limiting will be used as a middleware for the api endpoints

app.use("/SentinalOS/api/Analyze" , apiLimiter , AnalyzeRouter);
app.use("/SentinalOS/api/WebHooks" , apiLimiter , WebHooksRouter);

export async function main()
{
    try{
        app.listen(5000 , function()
        {
            console.log("App is listening on port 5000 !");
            return;
        });
        return;
    }
    catch(e)
    {
        console.log("Error Encountered !");
        return;
    }
}
main();