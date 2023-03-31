import httpStatus from "http-status";

export default function handleAPIErrors(err, req, res, next) {
    if (err.name === "UnprocessableEntityError") {
        return res
            .status(httpStatus.UNPROCESSABLE_ENTITY)
            .send({ message: err.message });
    }

    if (err.name === "InvalidCredentialsError") {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ message: err.message });
    }

    return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "InternalServerError", message: "Internal Server Error" });
}