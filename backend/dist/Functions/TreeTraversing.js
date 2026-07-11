"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseTree = traverseTree;
// The Recursive Tree Scanner Function
function traverseTree(node, Collections) {
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
        Collections.push({
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
            Collections.push({
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
            traverseTree(child, Collections);
        });
    }
}
//# sourceMappingURL=TreeTraversing.js.map