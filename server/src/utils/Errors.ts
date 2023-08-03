import {IResponse} from "../interfaces/IResponse";
import {Response} from 'express';


export const sendError = (res: Response, statusCode: number, message: string): void => {
  res.status(statusCode).json({
    status: "error",
    message: message
  });
}


class ErrorResponse extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorResponse;
