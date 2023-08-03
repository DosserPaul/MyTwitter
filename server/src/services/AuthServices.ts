import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  private githubClientId: string = process.env.GITHUB_CLIENT_ID || "";
  private githubClientSecret: string = process.env.GITHUB_CLIENT_SECRET || "";

  constructor() {
    this.prisma = new PrismaClient();
    this.jwtSecret = process.env.JWT_SECRET || "secret";
  }

  public async login(email: string, password: string): Promise<IResponseToken> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return {
        status: "error",
        code: 400,
        message: "Invalid credentials"
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: "error",
        code: 400,
        message: "Invalid credentials"
      }
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username
    }, this.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      status: "success",
      code: 200,
      message: "Logged in successfully",
      accessToken: token,
      id: user.id,
      username: user.username,
      email: user.email,
      hashtag: user.hashtag
    }
  }

  public async register({email, password, username, hashtag}: IUserPlayload): Promise<IResponse> {
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

  public async githubLogin(code: any): Promise<IResponseToken> {
    try {
      const response = await axios.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      }, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.data.access_token) {
        return {
          status: "error",
          code: 400,
          message: "Unable to login with GitHub"
        }
      }

      return {
        status: "success",
        code: 200,
        message: "Logged with GitHub successfully",
        accessToken: response.data.access_toke
      }

    } catch (e) {
      return {
        status: "error",
        code: 400,
        message: "Unable to login with GitHub"
      }
    }


  }
}

export default AuthServices;
