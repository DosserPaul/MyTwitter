Bonjour a tous !

Je suis ici aujourd'hui car je me pose une question sur la façon de faire mes classes Controller en NodeJS.
J'ai réfléchi à une nouvelle façon de faire mes `Controllers` et `Services`, et j'aimerais avoir votre avis sur la question.
Laquelle de ces deux façons est la plus optimisée et la plus propre ?



## Before

``` typescript
// AuthServices.ts
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {IResponse, IResponseToken} from "../interfaces/IResponse";
import {sendError} from "../utils/Errors";

import * as dotenv from "dotenv";
import {sendSuccess} from "../utils/Success";
dotenv.config();

interface IUserPlayload {
    email: string;
    password: string;
    username?: string;
    hashtag?: string;
}

class AuthServices {
    private prisma: PrismaClient;
    public jwtSecret: string;

    constructor() {
        this.prisma = new PrismaClient();
        this.jwtSecret = process.env.JWT_SECRET || "secret";
    }

    public async login({ email, password }: IUserPlayload): Promise<IResponseToken> {
        // login
    }

    public async register({ email, password, username, hashtag }: IUserPlayload): Promise<IResponse> {
        if (!email || !password || !username || !hashtag) {
            return sendError(400, "Please provide an email, a password, a username and a hashtag");
        }

        const emailExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (emailExists) {
            return sendError(400, "Email already exists")
        }

        const hashtagExists = await this.prisma.user.findUnique({
            where: {
                hashtag: hashtag
            }
        });
        if (hashtagExists) {
            return sendError(400, "Hashtag already exists")
        }

        if (password.length < 6) {
            return sendError(400, "Password must be at least 6 characters long");
        }
        if (username.length < 3) {
            return sendError(400, "Username must be at least 3 characters long")
        }
        if (username.length > 20) {
            return sendError(400, "Username must be at most 20 characters long")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username,
                hashtag: hashtag
            }
        });
        if (!user) {
            return sendError(500, "Something went wrong");
        }

        return sendSuccess(201, "User created successfully");
    }
}

export default AuthServices;
```

``` typescript
// AuthController.ts
import {NextFunction, Request, Response} from 'express';
import AuthService from '../services/AuthServices';
import {IResponse} from "../interfaces/IResponse";

class AuthController {
    public authService: AuthService = new AuthService();

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Login logic
    }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email, password, username, hashtag} = req.body;

            const userPayload = {
                email: email,
                password: password,
                username: username,
                hashtag: hashtag
            }

            const user: IResponse = await this.authService.register(userPayload);

            res.status(user.code).send({user});

        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
```

## Now
``` typescript
// BaseControllers.ts
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from "../utils/Errors";

export default abstract class BaseController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected services: any;

  protected constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.services = null;
  }

  protected abstract executeImpl(): Promise<void | any>;
  protected abstract validate(): Promise<void | any>;
  protected abstract process(): Promise<void | any>;
  protected abstract response(): Promise<void | any>;
  protected abstract error(): Promise<void | any>;
}
```

``` typescript
// RegisterController.ts
import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import AuthServices from "../../services/AuthServices";
import ErrorResponse, {sendError} from "../../utils/Errors";

class RegisterController extends BaseController {
  private data: any;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.services = AuthServices;
    this.data = null;
  }

  protected async executeImpl(): Promise<void | any> {
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
      throw new ErrorResponse(400, "Invalid request data")
    }
  }

  protected async process(): Promise<void | any> {
    try {
      const {email, password, username, hashtag} = this.req.body;

      this.data = await this.services.register({email, password, username, hashtag});

    } catch (error) {
      throw new ErrorResponse(500, "Something went wrong")
    }
  }

  protected async response(): Promise<void | any> {
    try {
      if (this.data.status === "error") {
        sendError(this.res, this.data.code, this.data.message)
      }

      this.res.status(this.data.code).json({
        status: this.data.status,
        message: this.data.message
      });

    } catch (error) {
      throw new ErrorResponse(500, "Something went wrong")
    }
  }

  protected async error(): Promise<void | any> {
    try {
      sendError(this.res, 500, "Something went wrong")
    } catch (error) {
      throw new ErrorResponse(500, "Something went wrong")
    }
  }
}

export default RegisterController;
```

``` typescript
// AuthServices.ts
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {IResponse, IResponseToken} from "../interfaces/IResponse";

import * as dotenv from "dotenv";
dotenv.config();

interface IUserPlayload {
    email: string;
    password: string;
    username: string;
    hashtag: string;
}

class AuthServices {
    private prisma: PrismaClient;
    public jwtSecret: string;

    constructor() {
        this.prisma = new PrismaClient();
        this.jwtSecret = process.env.JWT_SECRET || "secret";
    }

    public async login({ email, password }: IUserPlayload): Promise<IResponseToken> {
       // Login logic
    }

    public async register({ email, password, username, hashtag }: IUserPlayload): Promise<IResponse> {
        const emailExists = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (emailExists) {
            return {
                status: "error",
                code: 400,
                message: "Email already exists"
            }
        }

        const hashtagExists = await this.prisma.user.findUnique({
            where: {
                hashtag: hashtag
            }
        });
        if (hashtagExists) {
            return {
                status: "error",
                code: 400,
                message: "Hashtag already exists"
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username,
                hashtag: hashtag
            }
        });
        if (!user) {
            return {
                status: "error",
                code: 400,
                message: "Unable to create user"
            }
        }

        return {
            status: "success",
            code: 200,
            message: "User created successfully"
        }
    }
}

export default AuthServices;
```

``` typescript
// ErrorResponses.ts
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
```

Je trouve la nouvelle façon plus propre mais peut-être un peu plus compliquée et plus lourde à mettre en place car c'est un controller par route. Cependant, je pense que c'est plus facile à maintenir et à comprendre.

Qu'en pensez-vous ? Quelle est la meilleure façon de faire ? Ou avez-vous une autre manière de faire ?

Merci d'avance pour vos réponses.

PS : C'est pour un projet assez conséquent, je suis en train (enfin, j'essaie) de refaire Twitter.
