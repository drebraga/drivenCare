function unprocessableEntityError(message) {
  return {
    name: "UnprocessableEntityError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
    email,
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "User unauthorized, try to sign in again to continue",
  };
}

function duplicatedAppointmentError() {
  return {
    name: "DuplicatedAppointmentError",
    message: "There's already an appointment schedule for this time",
  };
}

function appointmentNotFound() {
  return {
    name: "AppointmentNotFound",
    message: "There's no appointment to confirm at this time",
  };
}

function doctorNotFound() {
  return {
    name: "DoctorNotFound",
    message: "No doctor found",
  };
}

function patientNotFound() {
  return {
    name: "PatientNotFound",
    message: "No patient found",
  };
}

function invalidId() {
  return {
    name: "InvalidId",
    message: "Invalid format of id",
  };
}

export default {
  unprocessableEntityError,
  invalidCredentialsError,
  duplicatedEmailError,
  unauthorizedError,
  duplicatedAppointmentError,
  appointmentNotFound,
  invalidId,
  doctorNotFound,
  patientNotFound,
};
