import { Queue } from "bullmq";
import redisConnectionOptions from "../Config/redis";

export const CODE_SCAN_QUEUE = "CodeScanQueue";

const queueConnection = {
    host: '127.0.0.1',
    port: 6379
};

const scanQueue = new Queue(CODE_SCAN_QUEUE, {
    connection: queueConnection
});

export default scanQueue;