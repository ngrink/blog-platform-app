import { ApiError } from "../../api.exceptions.js";


export class AccountError extends ApiError {
    static AccountNotFound() {
        return ApiError.NotFound("Account not found");
    }

    static UsernameExists() {
        return ApiError.BadRequest("User with that username already exists");
    }

    static EmailExists() {
        return ApiError.BadRequest("User with that email already exists");
    }
}
