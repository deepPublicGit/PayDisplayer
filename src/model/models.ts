
export interface FetchMessage {
    type: "FETCH_LEVELS";
    url: string
}

export interface FetchResponse {
    success: boolean;
    html?: string;
    error?: string;
}
