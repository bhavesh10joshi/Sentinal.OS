"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_SCAN_QUEUE = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("../Config/redis"));
exports.CODE_SCAN_QUEUE = "CodeScanQueue";
const scanQueue = new bullmq_1.Queue(exports.CODE_SCAN_QUEUE, {
    connection: redis_1.default
});
exports.default = scanQueue;
//# sourceMappingURL=scanQueue.js.map