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
        if (!email || !password) {
            return {
                code: 400,
                message: "Please provide an email and a password"
            }
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return sendError(400, "Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendError(400, "Invalid credentials")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, this.jwtSecret, {
            expiresIn: "1d",
        });

        return {
            code: 200,
            message: "Logged in successfully",
            accessToken: token
        }
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
