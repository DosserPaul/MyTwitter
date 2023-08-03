import {IResponse} from "../interfaces/IResponse";

export const sendSuccess = (code: number, message: string): IResponse => {
  return {
    code,
    message,
  };
}
