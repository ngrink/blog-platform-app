import { ApiError } from "../../api.exceptions.js";

export class PostError extends ApiError {
    static PostNotFound() {
        return ApiError.NotFound(
          "PostNotFound",
          "Post with that id not found")
    }

    static PostAlreadyPublished() {
        return ApiError.BadRequest(
          "PostAlreadyPublished",
          "The post has already been published")
    }

    static PostAlreadyLikedByUser() {
        return ApiError.BadRequest(
          "PostAlreadyLikedByUser",
          "The post has already been liked by this user")
    }

    static PostNotLikedByUser() {
        return ApiError.BadRequest(
          "PostNotLikedByUser",
          "The post is not liked by this user")
    }

    static LimitOptionInvalidValue() {
        return ApiError.BadRequest(
          "LimitOptionInvalidValue",
          "The maximum value of the 'limit' query parameter is 25")
    }

    static PostAlreadyBookmarked() {
        return ApiError.BadRequest(
          "PostAlreadyBookmarked",
          "The post has already bookmarked by user")
    }

    static PostNotBookmarked() {
        return ApiError.BadRequest(
          "PostNotBookmarked",
          "The post has not bookmarked by user")
    }
}
