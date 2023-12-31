import { ApiError } from './api.exceptions.js';


function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({
                type: err.type,
                message: err.message,
                errors: err.errors
            })
    }

    console.log('[Server] UNHANDLED ERROR:\n', err)
    res.status(500).json({message: "Internal server error"})
}

export { errorHandler };
