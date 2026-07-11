"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runParser = void 0;
const web_tree_sitter_1 = require("web-tree-sitter");
const path_1 = __importDefault(require("path"));
const TreeTraversing_1 = require("./TreeTraversing");
// Main code parser Function
const runParser = async function (RawCode) {
    const Collections = [];
    await web_tree_sitter_1.Parser.init();
    const parser = new web_tree_sitter_1.Parser();
    const TypescriptWasm = path_1.default.join(process.cwd(), 'src', 'wasm', 'tree-sitter-typescript.wasm');
    console.log("Parser successfully initialized!");
    const TypeScript = await web_tree_sitter_1.Language.load(TypescriptWasm);
    parser.setLanguage(TypeScript);
    console.log("Looking for inside Raw Code");
    const tree = parser.parse(RawCode);
    console.log("traversing through the Tree Nodes : ");
    (0, TreeTraversing_1.traverseTree)(tree?.rootNode, Collections);
    return Collections;
};
exports.runParser = runParser;
//# sourceMappingURL=RunParser.js.map