"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCodeToVectorStore = upsertCodeToVectorStore;
const pinecone_1 = require("@pinecone-database/pinecone");
const genai_1 = require("@google/genai");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
// Initialize the Google AI SDK using your existing API key
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// Initialize the Pinecone Client
const pc = new pinecone_1.Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index(process.env.PINECONE_INDEX_NAME || 'sentinel-os');
async function upsertCodeToVectorStore(chunks) {
    try {
        for (const chunk of chunks) {
            // Generate a high-dimensional embedding vector using Google's native text embedding engine
            const response = await ai.models.embedContent({
                model: 'text-embedding-004', // Google's standard 768-dimension embedding model
                contents: chunk.code,
            });
            // Access the first element of the 'embeddings' array returned by the modern Google SDK
            const embeddingVector = response.embeddings?.[0]?.values;
            if (!embeddingVector) {
                console.warn(`Failed to generate vector signature for chunk: ${chunk.id}`);
                continue;
            }
            // Push the vector signature along with structural metadata to your Pinecone namespace
            await index.namespace(chunk.metadata.userId).upsert({
                records: [
                    {
                        id: chunk.id,
                        values: embeddingVector,
                        metadata: {
                            rawCode: chunk.code, // Stored to reconstruct context instantly
                            fileName: chunk.metadata.fileName,
                            language: chunk.metadata.language
                        }
                    }
                ]
            });
        }
        console.log(`Successfully vectorized and indexed ${chunks.length} modules into Pinecone.`);
    }
    catch (error) {
        console.error('Critical failure during vector store sync orchestration: ', error);
        throw error;
    }
}
//# sourceMappingURL=VectorStore.js.map