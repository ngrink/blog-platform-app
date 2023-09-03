import { ApiError } from "../../api.exceptions.js";


export class AccountError extends ApiError {
    static AccountNotFound() {
        return ApiError.NotFound(
          "AccountNotFound",
          "Account not found"
        );
    }

    static UsernameExists() {
        return ApiError.BadRequest(
          "UsernameExists",
          "User with that username already exists"
        );
    }

    static EmailExists() {
        return ApiError.BadRequest(
          "EmailExists",
          "User with that email already exists"
        );
    }

    static UserNotFound() {
        return ApiError.NotFound(
          "UserNotFound",
          "User not found"
        );
    }

    static UserAlreadyFollowed() {
        return ApiError.BadRequest(
          "UserAlreadyFollowed",
          "User is already followed"
        );
    }

    static UserNotFollowed() {
        return ApiError.BadRequest(
          "UserNotFollowed",
          "User has not been added to the followed"
        );
    }
}
