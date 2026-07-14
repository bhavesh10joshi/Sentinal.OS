export declare function queryVectorStore(userId: string, userPrompt: string, topK?: number): Promise<{
    chunkId: string;
    score: number | undefined;
    fileName: string | number | true | string[];
    rawCode: string | number | true | string[];
}[]>;
//# sourceMappingURL=VectorQuery.d.ts.map