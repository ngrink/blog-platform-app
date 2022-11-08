import { ApiError } from "../../api.exceptions.js";

export class PostError extends ApiError {
    static PostNotFound() {
        return ApiError.NotFound("Post with that id not found")
    }

    static PostAlreadyLikedByUser() {
        return ApiError.BadRequest("The post has already been liked by this user")
    }

    static PostNotLikedByUser() {
        return ApiError.BadRequest("The post is not liked by this user")
    }

    static LimitOptionInvalidValue() {
        return ApiError.BadRequest("The maximum value of the 'limit' query parameter is 25")
    }
}
