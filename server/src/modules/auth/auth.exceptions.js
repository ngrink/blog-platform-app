import { ApiError } from "../../api.exceptions.js";

export class AuthError extends ApiError {
    static BadCredentials() {
        return ApiError.BadRequest(`Login or password is wrong`);
    }
}
