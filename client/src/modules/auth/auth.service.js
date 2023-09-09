import { AuthAPI } from "./auth.api";
import { AccountService } from "../accounts/account.service";


export class AuthService {
    static async login(login, password) {
        const auth = await AuthAPI.login(login, password);
        await AccountService.getProfile(auth.accountId);

        return auth;
    }

    static async logout() {
        return await AuthAPI.logout();
    }

    static async refresh() {
        return await AuthAPI.refresh();
    }
}
