import {NextFunction, Request, Response} from 'express';
import AuthService from '../services/auth.services';
import {IResponse} from "../interfaces/IResponse";

class AuthController {
    public authService: AuthService = new AuthService();

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email, password} = req.body;
            const userPayload = {
                email: email,
                password: password
            }

            const user: IResponse = await this.authService.login(userPayload);

            res.status(user.code).send({user})

        } catch (error) {
            next(error);
        }
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
