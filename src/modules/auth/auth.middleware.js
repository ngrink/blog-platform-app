import { AuthError } from './auth.exceptions';
import { AuthTokenService } from './auth.token.service';


export class AuthMiddleware {
    static async authorized(req, res, next) {
        try {
            const { accessToken } = req.cookies;
            if (!accessToken) {
                next(AuthError.Unauthorized());
            }
            const validToken = await AuthTokenService.verifyAccessToken(accessToken);
            if (!validToken) {
                next(AuthError.Unauthorized());
            }
            req.token = validToken;
            next();
        } catch (e) {
            next(AuthError.Unauthorized())
        }
    }
}
