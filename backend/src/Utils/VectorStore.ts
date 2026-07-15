import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });


const apiKey = process.env.GEMINI_API_KEY;

// 🔍 DIAGNOSTIC LOG: Confirm whether the key exists inside the file scope on startup
console.log("Scope Check -> Key Present:", !!apiKey);

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

// Initialize the Pinecone Client
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pc.index(process.env.PINECONE_INDEX_NAME || 'sentinel-os');

interface CodeChunk {
    id: string;         // Unique chunk identifier (e.g., file_path#function_name)
    code: string;       // The actual code snippet text string
    metadata: {
        userId: string;
        fileName: string;
        language: string;
    };
}

export async function upsertCodeToVectorStore(chunks: CodeChunk[]) {
    try {
        for (const chunk of chunks) {
            // Generate a high-dimensional embedding vector using Google's native text embedding engine
            const response = await ai.models.embedContent({
                model: 'models/gemini-embedding-001', // Google's standard 768-dimension embedding model
                contents: chunk.code,
                config: {
                    outputDimensionality: 768 //Forces Gemini to export a 768-dimension vector
                }
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
    } catch (error) {
        console.error('Critical failure during vector store sync orchestration: ', error);
        throw error;
    }
}