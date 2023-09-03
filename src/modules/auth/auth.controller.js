import { AuthService } from "./auth.service";


const cookieOptions = {
    maxAge: 30 * 24 * 3600000,
    httpOnly: true,
    signed: false,
}

export class AuthController {
    static async login(req, res, next) {
        try {
            const { login, password } = req.body
            const { accountData, accessToken, refreshToken } = await AuthService.login(login, password);

            res.cookie('accessToken',  accessToken, cookieOptions);
            res.cookie('refreshToken', refreshToken, {...cookieOptions, path: "/api/auth/refresh"});
            res.status(200).send(accountData);
        } catch (e) {
            next(e);
        }
    }

    static async logout(req, res, next) {
        try {
            const { accountId } = req.token;
            await AuthService.logout(accountId);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', {path: "/api/auth/refresh"});
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async refreshTokens(req, res, next) {
        try {
            const { refreshToken: token } = req.cookies;
            const { accessToken, refreshToken } = await AuthService.refreshTokens(token);

            res.cookie('accessToken', accessToken, cookieOptions);
            res.cookie('refreshToken', refreshToken, {...cookieOptions, path: '/api/auth/refresh'});
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }
}
