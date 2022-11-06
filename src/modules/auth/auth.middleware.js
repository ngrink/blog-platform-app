import { AuthError } from './auth.exceptions';
import { AuthTokenService } from './auth.token.service';


export class AuthMiddleware {
    static async authorized(req, res, next) {
        AuthMiddleware._parseToken(() => {
            next(AuthError.Unauthorized());
        });
    }

    static async optionalAuthorized(req, res, next) {
        AuthMiddleware._parseToken(() => {
            req.token = {};
            next();
        });
    }

    static async _parseToken(onError) {
        try {
            const { accessToken } = req.cookies;
            if (!accessToken) {
                onError();
            }
            const validToken = await AuthTokenService.verifyAccessToken(accessToken);
            if (!validToken) {
                onError();
            }
            req.token = validToken;
            next();
        } catch (e) {
            onError();
        }
    }
}
