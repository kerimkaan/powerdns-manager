module.exports = {
    OK: 200,
    NO_CONTENT: 204,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 403,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    UNPROCESSABLE: 422,
    ACCEPTED: 202,
    ERROR_STATUS_CODES: [
        this.INTERNAL_SERVER_ERROR,
        this.UNAUTHORIZED,
        this.BAD_REQUEST,
        this.CONFLICT,
        this.UNPROCESSABLE,
        this.NOT_FOUND,
    ],
};
