import { ApiError } from "../../api.exceptions.js";

export class PostError extends ApiError {
    static PostNotFound() {
        return ApiError.NotFound("Post with that id not found")
    }
}
