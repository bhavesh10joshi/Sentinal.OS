"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const web_tree_sitter_1 = require("web-tree-sitter");
async function runParser() {
    await web_tree_sitter_1.Parser.init();
    const parser = new web_tree_sitter_1.Parser();
    const TypescriptWasm = path_1.default.join(process.cwd(), 'src', 'wasm', 'tree-sitter-typescript.wasm');
    console.log("Parser successfully initialized!");
    const TypeScript = await web_tree_sitter_1.Language.load(TypescriptWasm);
    parser.setLanguage(TypeScript);
    // 🌟 THE FIX: Look relative to the root project folder instead of __dirname
    const dummyPath = path_1.default.join(process.cwd(), 'src', 'DummyData', 'dummy.ts');
    console.log("Looking for file at:", dummyPath);
    const codeContent = fs_1.default.readFileSync(dummyPath, 'utf8');
    console.log("Successfully read dummy.ts content!");
    const tree = parser.parse(codeContent);
    console.log("Tree Structure is : ");
    console.log(tree?.rootNode.toString());
}
runParser().catch(err => console.error(err));
//# sourceMappingURL=index.js.map