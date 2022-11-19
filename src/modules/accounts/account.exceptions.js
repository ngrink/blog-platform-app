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

    static UserNotFound() {
        return ApiError.NotFound("User not found");
    }

    static UserAlreadyFollowed() {
        return ApiError.BadRequest("User is already followed");
    }

    static UserNotFollowed() {
        return ApiError.BadRequest("User has not been added to the followed");
    }
}
