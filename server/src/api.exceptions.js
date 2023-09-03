/*
------------------------
Error format
------------------------
{
  type: "ErrorType",
  message: "Error message",
  errors: [
    {
      type: "ErrorType",
      field: "fieldName",
      message: "Error message"
    },
    {
      type: "ErrorType2",
      field: "fieldName2",
      message: "Error message2"
    }
  ]
}
*/



export class ApiError extends Error {
    status;
    type;
    message;
    errors;

    constructor(status, type, message, errors=[]) {
        super(message);

        this.status = status;
        this.type = type;
        this.message = message;
        this.errors = errors;
    }

    static BadRequest(type, message, errors=[]) {
        return new ApiError(400, type, message, errors);
    }

    static ValidationError(errors=[]) {
        return new ApiError(400, 'ValidationError', "Not all request fields are specified correctly", errors);
    }

    static Unauthorized() {
        return new ApiError(401, 'Unauthorized', "User not authorized");
    }

    static Forbidden(type, message="Access forbidden", errors=[]) {
        return new ApiError(403, type, message, errors);
    }

    static NotFound(type, message="Resource not found") {
        return new ApiError(404, type, message);
    }

    static NotImplemented(type, message="Not implemented") {
        return new ApiError(501, type, message);
    }
}
