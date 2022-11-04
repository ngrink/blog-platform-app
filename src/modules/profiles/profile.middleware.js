import { ApiError } from '../../api.exceptions';
import { ProfileService } from './profile.service';


export class ProfileMiddleware {
    static async profileOwner(req, res, next) {
        try {
            const { accountId } = req.token;

            (accountId === req.params.accountId)
                ? next()
                : next(ApiError.Forbidden())
        } catch (e) {
            next(ApiError.Forbidden())
        }
    }
}
