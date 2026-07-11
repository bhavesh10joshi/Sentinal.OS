"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateResponse = GenerateResponse;
const generative_ai_1 = require("@google/generative-ai");
const Arrays_1 = require("../CustomArrays/Arrays");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
async function GenerateResponse() {
    if (!process.env.GOOGLE_SDK_API_CREDENTIALS) {
        throw new Error("API key is not Present , Check and try again later ...");
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_SDK_API_CREDENTIALS);
    // Using gemini-2.5-flash for rapid, highly reliable structured JSON outputs
    const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
        //forcing the model level configuration to output strict JSON
        generationConfig: {
            responseMimeType: "application/json"
        }
    });
    console.log("\n Sending code blocks to Sentinel.OS AI Core for review...");
    for (const block of Arrays_1.Collections) {
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
            const response = await model.generateContent(systemPrompt);
            console.log(`📝 AI Structured Review for ${block.name}:`);
            if (response && response.response) {
                const rawJsonText = response.response.text();
                // Parse it to prove it's valid JSON
                const jsonOutput = JSON.parse(rawJsonText);
                console.dir(jsonOutput, { depth: null, colors: true });
            }
            else {
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
}
//# sourceMappingURL=AIParsing.js.map