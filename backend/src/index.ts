import fs from 'fs';
import path from 'path';
import { Parser, Language } from 'web-tree-sitter';


async function runParser() {
    await Parser.init();
    const parser = new Parser();

    const TypescriptWasm = path.join(process.cwd(), 'src', 'wasm', 'tree-sitter-typescript.wasm');
    console.log("Parser successfully initialized!");
    const TypeScript:any = await Language.load(TypescriptWasm);
    parser.setLanguage(TypeScript);


    // 🌟 THE FIX: Look relative to the root project folder instead of __dirname
    const dummyPath = path.join(process.cwd(), 'src', 'DummyData', 'dummy.ts');
    console.log("Looking for file at:", dummyPath);

    const codeContent = fs.readFileSync(dummyPath, 'utf8');
    console.log("Successfully read dummy.ts content!");
    
    const tree = parser.parse(codeContent);

    console.log("Tree Structure is : ");
    console.log(tree?.rootNode.toString());
}

runParser().catch(err => console.error(err));