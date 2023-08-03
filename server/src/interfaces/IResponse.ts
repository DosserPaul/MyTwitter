export interface IResponse {
    status: "success" | "error";
    code: number;
    message: string;
}

export interface IResponseToken extends IResponse {
    accessToken?: string;
    id?: number;
    username?: string;
    email?: string;
    hashtag?: string;
}
