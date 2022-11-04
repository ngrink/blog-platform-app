export class ApiError extends Error {
    message;
    status;
    errors;

    constructor(status, message, errors=[]) {
        super(message);
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors=[]) {
        return new ApiError(400, message, errors);
    }

    static ValidationError(errors=[]) {
        return new ApiError(400, "Not all request fields are specified correctly", errors);
    }

    static Unauthorized() {
        return new ApiError(401, "User not authorized");
    }

    static Forbidden(message="Access forbidden", errors=[]) {
        return new ApiError(403, message, errors);
    }

    static NotFound(message="Resource not found") {
        return new ApiError(404, message);
    }

    static NotImplemented(message="Not implemented") {
        return new ApiError(501, message);
    }
}
