"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runParser = void 0;
exports.traverseTree = traverseTree;
const web_tree_sitter_1 = require("web-tree-sitter");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Arrays_1 = require("../CustomArrays/Arrays");
const AIParsing_1 = require("../GeminiAISDK/AIParsing");
// Main code parser Function
const runParser = async function () {
    await web_tree_sitter_1.Parser.init();
    const parser = new web_tree_sitter_1.Parser();
    const TypescriptWasm = path_1.default.join(process.cwd(), 'src', 'wasm', 'tree-sitter-typescript.wasm');
    console.log("Parser successfully initialized!");
    const TypeScript = await web_tree_sitter_1.Language.load(TypescriptWasm);
    parser.setLanguage(TypeScript);
    //THE FIX: Look relative to the root project folder instead of __dirname
    const dummyPath = path_1.default.join(process.cwd(), 'src', 'DummyData', 'dummy.ts');
    console.log("Looking for file at:", dummyPath);
    const codeContent = fs_1.default.readFileSync(dummyPath, 'utf8');
    console.log("Successfully read dummy.ts content!");
    const tree = parser.parse(codeContent);
    // console.log("Tree Structure is : ");
    // console.log(tree?.rootNode.toString());
    console.log("traversing through the Tree Nodes : ");
    traverseTree(tree?.rootNode);
    (0, AIParsing_1.GenerateResponse)();
};
exports.runParser = runParser;
// The Recursive Tree Scanner Function
function traverseTree(node) {
    // Check if the current node is a function declaration
    // 1. Grab human-readable line numbers
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    if (node.type === 'function_declaration') {
        // 2. Look for the child that holds the function's name
        const nameNode = node.children.find((child) => child.type === 'identifier');
        // 3. If we found it, extract its text! Otherwise fall back to "Unknown"
        const functionName = nameNode ? nameNode.text : 'Unknown';
        // Pushing the Object in the array
        Arrays_1.Collections.push({
            name: functionName,
            type: 'function_declaration',
            startLine: startLine,
            endLine: endLine,
            code: node.text
        });
    }
    // Giving clear warning message in terminal for console.logs
    if (node.type === 'call_expression') {
        if (node.text.includes('console.log')) {
            // Pushing the Object in the array
            Arrays_1.Collections.push({
                name: 'console.log',
                type: 'function_declaration',
                startLine: startLine,
                endLine: endLine,
                code: node.text
            });
        }
    }
    // Climb down to the next branch: Loop through every child node recursively
    if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
            traverseTree(child);
        });
    }
}
//# sourceMappingURL=functions.js.map