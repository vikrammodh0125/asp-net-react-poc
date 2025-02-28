import { CookieService } from "./cookie";

export class AuthService {
  getUser() {
    const username = new CookieService().getValue("username");
    const role = new CookieService().getValue("role");

    return {
      username,
      role,
    };
  }
}
