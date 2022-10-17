import { AccountService } from "./account.service";


export class AccountController {
    static async createAccount(req, res, next) {
        try {
            const { username, email, password, confirmPassword } = req.body;
            await AccountService.createAccount(username, email, password, confirmPassword)

            res.status(201).json("OK")
        } catch (e) {
            next(e);
        }
    }
}
