export interface IResponse {
    message: string;
    code: number;
}

export interface IResponseToken extends IResponse {
    accessToken?: string;
}
