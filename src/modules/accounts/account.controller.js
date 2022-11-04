import { ProfileService } from "../profiles";
import { AccountService } from "./account.service";


export class AccountController {
    static async createAccount(req, res, next) {
        try {
            const { username, email, password, confirmPassword } = req.body;
            const account = await AccountService.createAccount(username, email, password, confirmPassword)
            await ProfileService.createProfile(account._id);

            res.status(201).json("OK")
        } catch (e) {
            next(e);
        }
    }
}
