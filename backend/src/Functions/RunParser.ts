import { Parser, Language } from 'web-tree-sitter';
import path from 'path';
import { traverseTree } from './TreeTraversing';

// Main code parser Function
export const runParser = async function(RawCode:string) {
    const Collections:any = [];

    await Parser.init();
    const parser = new Parser();

    const TypescriptWasm = path.join(process.cwd(), 'src', 'wasm', 'tree-sitter-typescript.wasm');
    console.log("Parser successfully initialized!");
    const TypeScript:any = await Language.load(TypescriptWasm);
    parser.setLanguage(TypeScript);


    console.log("Looking for inside Raw Code");
    
    const tree = parser.parse(RawCode);

    console.log("traversing through the Tree Nodes : ");
    traverseTree(tree?.rootNode , Collections);

    return Collections;
}

