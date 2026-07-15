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
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./workers/scanWorker");
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Using the below rate limiting massive api hit using heavy payloads can be restricted
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Above rate limiting will be used as a middleware for the api endpoints
app.use("/SentinalOS/api/Analyze", Analyze_1.default);
app.use("/SentinalOS/api/WebHooks", WebHooks_1.default);
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