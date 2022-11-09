import { ApiError } from '../../api.exceptions';


export class AccountMiddleware {
    static async accountOwner(req, res, next) {
        try {
            const { accountId } = req.token;
            const { accountId: id } = req.params;

            (accountId === id)
                ? next()
                : next(ApiError.Forbidden())
        } catch (e) {
            next(ApiError.Forbidden())
        }
    }
}
