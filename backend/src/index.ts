// import { runParser } from './Functions/RunParser';
// runParser().catch(err => console.error(err));
import express from "express";
import cors from "cors";
import WebHooksRouter from "./Routers/WebHooks";
import AnalyzeRouter from "./Routers/Analyze";
import helmet from "helmet"
import "dotenv/config";
import path from 'path';
import dotenv from 'dotenv';

import "./workers/scanWorker"

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const app = express();
app.use(helmet());

app.use(cors());
app.use(express.json());
// Using the below rate limiting massive api hit using heavy payloads can be restricted
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended:true , limit:"10mb"}))
 
// Above rate limiting will be used as a middleware for the api endpoints

app.use("/SentinalOS/api/Analyze"  , AnalyzeRouter);
app.use("/SentinalOS/api/WebHooks" , WebHooksRouter);

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