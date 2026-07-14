"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
// import { runParser } from './Functions/RunParser';
// runParser().catch(err => console.error(err));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const WebHooks_1 = __importDefault(require("./Routers/WebHooks"));
const Analyze_1 = __importDefault(require("./Routers/Analyze"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type", "Authorization", "x-user-id"],
    credentials: true
}));
// Using the below rate limiting massive api hit using heavy payloads can be restricted
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Rate Limiting for protecting the server from spam api hitting
const apiLimiter = (0, express_rate_limit_1.rateLimit)({
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
app.use("/SentinalOS/api/Analyze", apiLimiter, Analyze_1.default);
app.use("/SentinalOS/api/WebHooks", apiLimiter, WebHooks_1.default);
async function main() {
    try {
        app.listen(5000, function () {
            console.log("App is listening on port 5000 !");
            return;
        });
        return;
    }
    catch (e) {
        console.log("Error Encountered !");
        return;
    }
}
main();
//# sourceMappingURL=index.js.map