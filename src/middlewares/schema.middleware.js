import err from "../errors/index.js";

const schemaValidate = (schema) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((detail) => detail.message);
            throw err.unprocessableEntityError(message);
        }
        next();
    }
};

export default schemaValidate;