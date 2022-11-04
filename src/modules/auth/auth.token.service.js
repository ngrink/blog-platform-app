import { TokenService } from "../../utils/tokens";


export class AuthTokenService {
    static async generateAccessToken(payload) {
        return await TokenService.generate(
          payload,
          process.env.JWT_ACCESS_SECRET,
          {expiresIn: '10m'}
        );
    }

    static async generateRefreshToken(payload) {
        return await TokenService.generate(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '30d'}
        );
    }

    static async verifyAccessToken(token) {
        return await TokenService.verify(token, process.env.JWT_ACCESS_SECRET);
    }

    static async verifyRefreshToken(token) {
        return await TokenService.verify(token, process.env.JWT_REFRESH_SECRET);
    }
}
