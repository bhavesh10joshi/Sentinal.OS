"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_SCAN_QUEUE = void 0;
const bullmq_1 = require("bullmq");
exports.CODE_SCAN_QUEUE = "CodeScanQueue";
const queueConnection = {
    host: '127.0.0.1',
    port: 6379
};
const scanQueue = new bullmq_1.Queue(exports.CODE_SCAN_QUEUE, {
    connection: queueConnection
});
exports.default = scanQueue;
//# sourceMappingURL=scanQueue.js.map