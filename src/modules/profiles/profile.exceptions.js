import { ApiError } from "../../api.exceptions.js";

export class ProfileError extends ApiError {
    static profileNotFound() {
        ApiError.NotFound(`Profile not found`)
    }
}
