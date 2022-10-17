import { AuthError } from './auth.exceptions';
import { AuthTokenService } from './auth.token.service';


export class AuthMiddleware {
    static async authorized(req, res, next) {
        try {
            const { accessToken } = req.cookies;
            if (!accessToken) {
                next(AuthError.Unauthorized());
            }

            const data = await AuthTokenService.verifyAccessToken(accessToken);
            req.token = data;
            next();
        } catch (e) {
            next(AuthError.Unauthorized())
        }
    }
}
