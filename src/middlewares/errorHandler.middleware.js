import httpStatus from "http-status";

export default function handleAPIErrors(err, req, res, next) {
  if (err.name === "UnprocessableEntityError" || err.name === "InvalidId") {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send({ message: err.message });
  }

  if (err.name === "InvalidCredentialsError") {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }

  if (err.name === "DuplicatedEmailError") {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: err.message, email: err.email });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }

  if (err.name === "DuplicatedAppointmentError") {
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }

  if (err.name === "AppointmentNotFound") {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  console.log(err);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
