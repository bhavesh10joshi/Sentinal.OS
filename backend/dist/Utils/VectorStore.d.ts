interface CodeChunk {
    id: string;
    code: string;
    metadata: {
        userId: string;
        fileName: string;
        language: string;
    };
}
export declare function upsertCodeToVectorStore(chunks: CodeChunk[]): Promise<void>;
export {};
//# sourceMappingURL=VectorStore.d.ts.map