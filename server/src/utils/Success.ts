import {IResponse} from "../interfaces/IResponse";
import {Response} from "express";

export const sendSuccess = (res: Response, statusCode: number, message: string, data: any): void => {
  res.status(statusCode).json({
    message: message,
    data: data
  });
}
