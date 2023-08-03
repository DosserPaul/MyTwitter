import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import {sendError} from "../../utils/Errors";
import AuthServices from "../../services/AuthServices";

class LoginController extends BaseController {
  private data: any;
  private services: AuthServices = new AuthServices();

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.data = null;
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    try {
      new LoginController(req, res, next).execute().then(r => r);
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
      const {email, password} = this.req.body;

      if (!email || !password) {
        sendError(this.res, 400, "Please provide an email, a password, a username and a hashtag");
      }
    } catch (error) {
      sendError(this.res, 400, "Invalid request data")
    }
  }

  protected async process(): Promise<void | any> {
    try {
      const {email, password} = this.req.body;

      this.data = await this.services.login(email, password);
    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async respond(): Promise<void | any> {
    try {
      if (!this.data) {
        sendError(this.res, 400, "Invalid credentials")
      }

      if (this.data.status === "error") {
        sendError(this.res, 400, this.data.error)
      }

      this.res.status(200).json({
        id: this.data.id,
        username: this.data.username,
        email: this.data.email,
        hashtag: this.data.hashtag,
        token: this.data.accessToken,
      });

    } catch (error) {
      sendError(this.res, 500, "Something went wrong")
    }
  }

  protected async error(): Promise<void | any> {
    sendError(this.res, 500, "Something went wrong")
  }
}

export default LoginController;
