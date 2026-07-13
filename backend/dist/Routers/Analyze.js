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
const Db_1 = __importDefault(require("../Db/Db"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage
});
const AnalyzeRouter = (0, express_1.Router)();
AnalyzeRouter.post("/raw", async function (req, res) {
    const RawCode = req.body.RawCode;
    const userId = req.body.userId || "anonymous_default_user";
    if (!RawCode) {
        res.status(StatusCodes_1.ClientErrorStatusCodes.BadRequest).json({
            msg: "No Code entered !"
        });
        return;
    }
    // Generating the parse code for the given code
    try {
        const Collections = await (0, RunParser_1.runParser)(RawCode);
        const Response = await (0, AIParsing_1.GenerateResponse)(Collections);
        const SavedReport = await Db_1.default.scanReport.create({
            data: {
                userId: userId,
                fileName: "Raw Snippet SandBox",
                totalBlocksScanned: Collections.length,
                success: true,
                findings: {
                    create: Response.map((item) => ({
                        functionName: item.functionName,
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
        return res.json({
            success: true,
            reportId: SavedReport.id,
            fileName: SavedReport.fileName,
            TotalBlocksScanned: SavedReport.totalBlocksScanned,
            findings: SavedReport.findings
        });
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
    const userId = req.body.userId || "anonymous_default_user";
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
        const SavedReport = await Db_1.default.scanReport.create({
            data: {
                userId: userId,
                fileName: req.file.originalname,
                totalBlocksScanned: Collections.length,
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
            },
            include: {
                findings: true
            }
        });
        res.status(StatusCodes_1.SuccessStatusCodes.Success).json({
            success: true,
            reportId: SavedReport.id,
            fileName: SavedReport.fileName,
            TotalBlocksScanned: SavedReport.totalBlocksScanned,
            findings: SavedReport.findings
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
//Api request for getting the full history of the userId and there scans 
AnalyzeRouter.get("/history", async function (req, res) {
    const userId = req.body.userId;
    if (!userId) {
        res.status(StatusCodes_1.ClientErrorStatusCodes.BadRequest).json({
            success: false,
            error: "No userId provided by the user in order to track down the previous code scanning requests..."
        });
        return;
    }
    try {
        const fullHistory = await Db_1.default.scanReport.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                //To get the full Scanning history in descending order(Newest to older ones)
                createdAt: "desc"
            },
            include: {
                findings: true
            }
        });
        res.status(StatusCodes_1.SuccessStatusCodes.Success).json({
            success: true,
            history: fullHistory
        });
        return;
    }
    catch (e) {
        res.status(StatusCodes_1.ServerErrors.InternalServerError).json({
            success: false,
            error: "Internal Server Error Occurred !",
            details: e
        });
        return;
    }
});
exports.default = AnalyzeRouter;
//# sourceMappingURL=Analyze.js.map