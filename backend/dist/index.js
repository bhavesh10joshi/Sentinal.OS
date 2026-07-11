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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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