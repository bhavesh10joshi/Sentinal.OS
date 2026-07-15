import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import dotenv from 'dotenv';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

export async function GenerateResponse(Collections: any[]) {
    const ResponseArray: any[] = [];

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3.5-flash",
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    console.log("\n Sending code blocks to Sentinel.OS AI Core for review...");

    for (const block of Collections) {
        console.log(`\n Reviewing function [${block.name}] (Lines ${block.startLine}-${block.endLine})...`);

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

        // Manage block-level independent retry state limits safely
        let attemptsLeft = 3;
        let successfulScan = false;

        while (attemptsLeft > 0 && !successfulScan) {
            try {
                const response: any = await model.generateContent(systemPrompt);
                console.log(`📝 AI Structured Review for ${block.name}:`);
                
                if (response && response.response) {
                    const rawJsonText = response.response.text();
                    const jsonOutput = JSON.parse(rawJsonText);
                    
                    ResponseArray.push({
                        functionname: block.name, 
                        startLine: block.startLine, 
                        endLine: block.endLine, 
                        analysis: jsonOutput
                    });
                    successfulScan = true; // Break the current block retry loop
                } else {
                    console.log("No response text found.");
                    attemptsLeft--;
                }        
                console.log("------------------------------------------------");        
            }
            catch (error: any) { 
                //Intercept Google Free Tier Quota limits safely inside the block loop
                if (error.status === 429 || error.message?.includes('429')) {
                    attemptsLeft--;
                    
                    const delaySeconds = error.errorDetails?.find((d: any) => d.retryDelay)?.retryDelay 
                        ? parseInt(error.errorDetails.find((d: any) => d.retryDelay).retryDelay)
                        : 8;

                    console.warn(`Hit free tier rate limit. Backing off for ${delaySeconds}s before retrying... (${attemptsLeft} retries left)`);
                    
                    await sleep(delaySeconds * 1000 + 500); 
                    continue; // Re-fire the while loop for this exact block
                }

                // Hard error fallback for unresolvable exceptions (like bad syntax parsing syntax)
                console.log(`Error encountered while analyzing ${block.name}:`);
                console.error(error);
                break; // Break the block retry sequence to keep the broader collection iterating
            }
        }
    }
    return ResponseArray;
}