import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

export async function GenerateResponse(Collections:any) {
    const ResponseArray:any = [];

    if (!process.env.GOOGLE_SDK_API_CREDENTIALS) {
        throw new Error("API key is not Present , Check and try again later ...");   
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_SDK_API_CREDENTIALS as string);
    
    // Using gemini-2.5-flash for rapid, highly reliable structured JSON outputs
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3.5-flash",
        //forcing the model level configuration to output strict JSON
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    console.log("\n Sending code blocks to Sentinel.OS AI Core for review...");

    for (const block of Collections) {
        console.log(`\n Reviewing function [${block.name}] (Lines ${block.startLine}-${block.endLine})...`);

        // Refined prompt explicitly describing the JSON keys expected
        const systemPrompt = `
            You are a Senior Systems Security Architect reviewing code for production.
            Analyze the following code snippet isolated from a file. 
            Identify any security flaws, code quality issues, or unnecessary debugging syntax (like console logs).

            Code Snippet to Analyze:
            \`\`\`typescript
            ${block.code}
            \`\`\`

            Return a JSON object matching this exact schema:
            {
                "vulnerabilityFound": boolean,
                "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NONE",
                "issueSummary": "Short description of the bug or code quality issue found, or 'No issues found' if clean.",
                "remediationCode": "The exact corrected code snippet string, or an empty string if clean."
            }
        `;

        try {
            const response: any = await model.generateContent(systemPrompt);
            console.log(`📝 AI Structured Review for ${block.name}:`);
            
            if (response && response.response) {
                const rawJsonText = response.response.text();
                
                // Parse it to prove it's valid JSON
                const jsonOutput = JSON.parse(rawJsonText);
                
                ResponseArray.push({
                    functionname : block.name , 
                    startLine : block.startLine , 
                    endLine : block.endLine , 
                    analysis : jsonOutput
                });
            } else {
                console.log("No response text found.");
            }        
            console.log("------------------------------------------------");        
        }
        catch (e) {   
            console.log(` Error encountered while analyzing ${block.name}:`);
            console.log(e);
            continue; // Keep tracking downstream elements regardless of independent failures
        }
    }
    return ResponseArray;
}