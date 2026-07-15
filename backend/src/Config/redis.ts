import path from "path";
import dotenv from 'dotenv';
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// making connection to the local instance of redis
const redisConnectionOptions = ({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_HOST) || 6379,
    maxRetriesPerRequest: null
});

export default redisConnectionOptions;
