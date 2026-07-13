// import { runParser } from './Functions/RunParser';
// runParser().catch(err => console.error(err));
import express from "express";
import cors from "cors";
import WebHooksRouter from "./Routers/WebHooks";
import AnalyzeRouter from "./Routers/Analyze";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/SentinalOS/api/Analyze" , AnalyzeRouter);
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