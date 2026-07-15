import { Pinecone , RecordMetadata} from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

//Define the structural schema of the metadata you stored inside Pinecone
interface CodeMetadata extends RecordMetadata {
    rawCode: string;
    fileName: string;
    language: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

//Pass the interface directly into the index instance constructor
const index = pc.index<CodeMetadata>(process.env.PINECONE_INDEX_NAME || 'sentinel-os');

export async function queryVectorStore(userId: string, userPrompt: string, topK: number = 3) {
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

    } catch (error) {
        console.error('Error executing vector semantic database search query: ', error);
        throw error;
    }
}