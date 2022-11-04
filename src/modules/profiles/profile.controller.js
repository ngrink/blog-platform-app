import { ProfileService } from "./profile.service";


export class ProfileController {
    static async getProfile(req, res, next) {
        try {
            const { accountId } = req.params;

            const profile = await ProfileService.getProfile(accountId);
            res.status(200).json(profile);
        } catch (e) {
            next(e);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { accountId } = req.token;
            const data = req.body;

            const profile = await ProfileService.updateProfile(accountId, data);
            res.status(200).json(profile);
        } catch (e) {
            next(e);
        }
    }
}
