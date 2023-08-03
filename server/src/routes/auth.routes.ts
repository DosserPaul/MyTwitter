import {Router} from "express";
import AuthController from "../controllers/auth.controller";
// import authMiddleware from "../middlewares/auth.middleware";

class AuthRouter {
    public router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();

        this.routes();
    }

    private routes(): void {
        this.router.post("/login", this.authController.login);
        this.router.post("/register", this.authController.register);
        // this.router.post("/logout", authMiddleware, this.authController.logout);
    }
}

export default new AuthRouter().router;
