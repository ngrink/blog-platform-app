import { AccountService } from "./account.service";


export class AccountController {
    static async createAccount(req, res, next) {
        try {
            const { username, email, password, confirmPassword, profile } = req.body;
            const account = await AccountService.createAccount(username, email, password, confirmPassword, profile)

            res.status(201).json("OK")
        } catch (e) {
            next(e);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const { accountId } = req.params;

            const profile = await AccountService.getProfile(accountId);
            res.status(200).json(profile);
        } catch (e) {
            next(e);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { accountId } = req.params;
            const data = req.body;

            const profile = await AccountService.updateProfile(accountId, data);
            res.status(200).json(profile);
        } catch (e) {
            next(e);
        }
    }

    static async followUser(req, res, next) {
        try {
            const { accountId } = req.token;
            const { accountId: authorId } = req.params;

            await AccountService.followUser(accountId, authorId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async unfollowUser(req, res, next) {
        try {
            const { accountId } = req.token;
            const { accountId: authorId } = req.params;

            await AccountService.unfollowUser(accountId, authorId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

}
