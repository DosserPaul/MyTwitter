import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import {sendError} from "../../utils/Errors";
import AuthServices from "../../services/AuthServices";

class RegisterController extends BaseController {
  private data: any;
  private services: AuthServices = new AuthServices();

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.data = null;
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    try {
      new RegisterController(req, res, next).execute().then(r => r);
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
      const {email, password, username, hashtag} = this.req.body;

      if (!email || !password || !username || !hashtag) {
        sendError(this.res, 400, "Please provide an email, a password, a username and a hashtag");
      }

      if (password.length < 8 || password.length > 32) {
        sendError(this.res, 400, "Password must be between 8 and 32 characters long")
      }

      if (username.length < 3 || username.length > 32) {
        sendError(this.res, 400, "Username must be between 3 and 32 characters long")
      }

      if (hashtag.length < 3 || hashtag.length > 20) {
        sendError(this.res, 400, "Hashtag must be between 3 and 20 characters long")
      }

    } catch (error) {
      sendError(this.res, 400, "Invalid request data")
    }
  }

  protected async process(): Promise<void | any> {
    try {
      const {email, password, username, hashtag} = this.req.body;

      this.data = await this.services.register({email, password, username, hashtag});
    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async respond(): Promise<void | any> {
    try {
      this.res.status(this.data.code).json({
        status: this.data.status,
        message: this.data.message
      });

    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async error(): Promise<void | any> {
    sendError(this.res, 500, "Something went wrong")
  }
}

export default RegisterController;
