
export interface FetchMessage {
    type: "FETCH_LEVELS";
    url: string
}

export interface FetchResponse {
    success: boolean;
    html?: string;
    error?: string;
}

export interface Result {
    pay: number;
    url: string;
}
