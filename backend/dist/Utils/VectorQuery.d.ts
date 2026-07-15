export declare function queryVectorStore(userId: string, userPrompt: string, topK?: number): Promise<{
    chunkId: string;
    score: number | undefined;
    fileName: string;
    rawCode: string;
}[]>;
//# sourceMappingURL=VectorQuery.d.ts.map