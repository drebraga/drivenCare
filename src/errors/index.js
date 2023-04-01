function unprocessableEntityError(message) {
    return {
        name: "UnprocessableEntityError",
        message
    };
}

function duplicatedEmailError(email) {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email",
        email
    };
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect"
    };
}

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must sign in to continue"
    };
}

export default {
    unprocessableEntityError, invalidCredentialsError, duplicatedEmailError,
    unauthorizedError
};