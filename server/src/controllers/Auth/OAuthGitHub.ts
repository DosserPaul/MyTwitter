import {NextFunction, Request, Response} from 'express';
import * as dotenv from "dotenv";
dotenv.config();

import BaseController from "../BaseController";
import {sendError} from "../../utils/Errors";
import AuthServices from "../../services/AuthServices";

class OAuthGitHub extends BaseController {
  private data: any;
  private services: AuthServices = new AuthServices();
  private githubClientId: string = process.env.GITHUB_CLIENT_ID || "";

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.data = null;
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    try {
      new OAuthGitHub(req, res, next).execute().then(r => r);
    } catch (error) {
      next(error);
    }
  }

  protected async execute(): Promise<void | any> {
    try {
      await this.validate();
      await this.process();
      await this.respond();
    } catch (error) {
      await this.error();
    }
  }

  protected async validate(): Promise<void | any> {
    try {

    } catch (error) {
      sendError(this.res, 400, "Invalid request data")
    }
  }

  protected async process(): Promise<void | any> {
    try {

    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async respond(): Promise<void | any> {
    try {
      this.res.redirect("https://github.com/login/oauth/authorize?client_id=" + this.githubClientId)
    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async error(): Promise<void | any> {
    sendError(this.res, 500, "Something went wrong")
  }
}

export default OAuthGitHub;
