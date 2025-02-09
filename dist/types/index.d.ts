export interface IMockInstance {
    mock: Promise<{
        code: string;
        data: any;
    }>;
    config: {
        isObject?: boolean;
        delayTime?: number;
        maxRadomTime?: number;
        onlyReject?: boolean;
        isRadomStatus?: boolean;
        isObjectArray?: boolean;
        objectFieldType?: Array<"string" | "number" | "boolean" | "object" | "array" | "url" | "image" | "time" | "color" | "base64Image">;
        maxObjectArraySize?: number;
        log?: boolean;
    };
}
export interface IPollingConfig {
    data: any;
    maxPollingAttempts?: number;
    pollingInterval?: number;
}
