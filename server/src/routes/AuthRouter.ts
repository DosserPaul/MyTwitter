import BaseRouter from "./BaseRouter";
import RegisterController from "../controllers/Auth/RegisterController";
import LoginController from "../controllers/Auth/LoginController";
import OAuthGitHub from "../controllers/Auth/OAuthGitHub";
import OAuthGitHubCallBack from "../controllers/Auth/OAuthGitHubCallBack";

class AuthRouter extends BaseRouter {
  constructor() {
    super();
    this.routes();
  }

  protected routes(): void {
    this.router.post("/login", LoginController.handle);
    this.router.post("/register", RegisterController.handle);
    // OAuth GitHub
    this.router.get("/github", OAuthGitHub.handle);
    this.router.get("/github/callback", OAuthGitHubCallBack.handle);
  }
}

export default new AuthRouter().router;
