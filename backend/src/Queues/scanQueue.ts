import { Queue } from "bullmq";
import redisConnectionOptions from "../Config/redis";

export const CODE_SCAN_QUEUE = "CodeScanQueue";

const scanQueue = new Queue(CODE_SCAN_QUEUE , {
    connection : redisConnectionOptions
});

export default scanQueue;