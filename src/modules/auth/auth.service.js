import Joi from "joi";
import bcrypt from "bcrypt";

import { AccountModel } from "../accounts/account.model";
import { AuthTokenService } from "./auth.token.service";
import { AuthModel } from "./auth.model";
import { AccessPayloadDto } from "./dto/access.dto";
import { RefreshPayloadDto } from "./dto/refresh.dto";
import { AuthError } from "./auth.exceptions";


export class AuthService {
    static async login(login, password) {
        // Fetch user from DB
        const account = await AccountModel.findOne({$or: [
            {email: login},
            {username: login}
        ]})
        if (!account) {
            throw AuthError.BadCredentials();
        }
        // Compare passwords
        const match = await bcrypt.compare(password, account.password)
        if (!match) {
            throw AuthError.BadCredentials();
        }

        const tokens = await AuthService._generateAndSaveTokens(account);
        return tokens;
    }

    static async logout(accountId) {
        await AuthModel.findOneAndDelete({accountId})
    }

    static async refreshTokens(refreshToken) {
        const auth = await AuthModel.findOne({refreshToken})
        if (!auth) {
            throw AuthError.Unauthorized();
        }

        const account = await AccountModel.findById(auth.accountId);
        const tokens = await AuthService._generateAndSaveTokens(account);
        return tokens;
    }

    static async _generateAndSaveTokens(account) {
        // Generate tokens
        const accessToken = await AuthTokenService.generateAccessToken({...new AccessPayloadDto(account)})
        const refreshToken = await AuthTokenService.generateRefreshToken({...new RefreshPayloadDto(account)})
        // Save refresh token to DB
        await AuthModel.findOneAndUpdate({accountId: account._id}, {refreshToken}, {upsert: true})

        return { accessToken, refreshToken };
    }
}
