function unprocessableEntityError(message) {
    return {
        name: "UnprocessableEntityError",
        message
    }
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password incorrect"
    }
}

export default {
    unprocessableEntityError, invalidCredentialsError
}