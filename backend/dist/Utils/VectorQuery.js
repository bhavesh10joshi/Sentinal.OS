"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryVectorStore = queryVectorStore;
const pinecone_1 = require("@pinecone-database/pinecone");
const genai_1 = require("@google/genai");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pc = new pinecone_1.Pinecone({ apiKey: process.env.PINECONE_API_KEY });
//Pass the interface directly into the index instance constructor
const index = pc.index(process.env.PINECONE_INDEX_NAME || 'sentinel-os');
async function queryVectorStore(userId, userPrompt, topK = 3) {
    try {
        // Convert the plain text search prompt into a vector signature matching the database dimensions
        const response = await ai.models.embedContent({
            model: 'models/gemini-embedding-001',
            contents: userPrompt,
            config: {
                outputDimensionality: 768 //Forces Gemini to export a 768-dimension vector
            }
        });
        const queryVector = response.embeddings?.[0]?.values;
        if (!queryVector) {
            throw new Error("Could not compute embedding vector signature for search query.");
        }
        // Query Pinecone's vector map specifically inside the isolated user namespace
        const queryResponse = await index.namespace(userId).query({
            vector: queryVector,
            topK: topK,
            includeMetadata: true // Forces Pinecone to return our 'rawCode' and 'fileName' strings
        });
        // Map the vector match records back into a clean object array format
        return queryResponse.matches.map(match => ({
            chunkId: match.id,
            score: match.score, // Mathematical similarity rating (1.0 means identical match)
            fileName: match.metadata?.fileName || 'unknown', // ✅ Perfectly type-safe now!
            rawCode: match.metadata?.rawCode || '// No code block fetched.' // ✅ Perfectly type-safe now!
        }));
    }
    catch (error) {
        console.error('Error executing vector semantic database search query: ', error);
        throw error;
    }
}
//# sourceMappingURL=VectorQuery.js.map