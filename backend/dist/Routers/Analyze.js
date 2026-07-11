"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RunParser_1 = require("../Functions/RunParser");
const AIParsing_1 = require("../GeminiAISDK/AIParsing");
const StatusCodes_1 = require("../StatusCodes/StatusCodes");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage
});
const AnalyzeRouter = (0, express_1.Router)();
AnalyzeRouter.post("/raw", async function (req, res) {
    const RawCode = req.body.RawCode;
    if (!RawCode) {
        res.status().json({
            msg: "No Code entered !"
        });
        return;
    }
    // Generating the parse code for the given code
    try {
        const Collections = await (0, RunParser_1.runParser)(RawCode);
        const Response = await (0, AIParsing_1.GenerateResponse)(Collections);
        res.json({
            success: true,
            TotalBlocksScanned: Collections.length,
            findings: Response
        });
        return;
    }
    catch (e) {
        console.log("Pipeline Failure : " + e);
        res.status(StatusCodes_1.ServerErrors.InternalServerError).json({
            success: false,
            error: "Internal Server Error Encountered , Completely dropped the execution .",
            details: e
        });
        return;
    }
});
// We will search for codeFile(By this name the sender will atach his/her file)
AnalyzeRouter.post("/file", upload.single("codeFile"), async function (req, res) {
    try {
        if (!req.file) {
            res.status(StatusCodes_1.ServerErrors.InternalServerError).json({
                success: false,
                error: "No file Found on the recieving end !"
            });
            return;
        }
        // will start to read the file content
        const FileContent = req.file.buffer.toString('utf8');
        console.log(`Received file: ${req.file.originalname} (${req.file.size} bytes)`);
        // Storing the functions and other attributes in the collection
        const Collections = await (0, RunParser_1.runParser)(FileContent);
        const Response = await (0, AIParsing_1.GenerateResponse)(Collections);
        res.status(StatusCodes_1.SuccessStatusCodes.Success).json({
            success: true,
            filename: req.file.originalname,
            TotalBlocksScanned: Collections.length,
            findings: Response
        });
        return;
    }
    catch (e) {
        res.status(StatusCodes_1.ServerErrors.InternalServerError).json({
            success: false,
            error: "Internal server Error Occurred !",
            details: e
        });
        return;
    }
});
exports.default = AnalyzeRouter;
//# sourceMappingURL=Analyze.js.map