import {IResponse} from "../interfaces/IResponse";

export const sendError = (code: number, message: string): IResponse => {
  return {
    code,
    message,
  };
}
