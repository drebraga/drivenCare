import jwt from "jsonwebtoken";
import usersRepository from "../repositories/users.repository.js";
import doctorsRepository from "../repositories/doctors.repository.js";
import errors from "../errors/index.js";

async function authentication(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) throw errors.unauthorizedError();

    const parts = authorization.split(" ");
    if (parts.length !== 2) throw errors.unauthorizedError();

    const [schema, token] = parts;
    if (schema !== "Bearer") throw errors.unauthorizedError();

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        try {
            if (error) throw errors.unauthorizedError();

            const { rows: [user] } = (decoded.userType === "patient") ?
                await usersRepository.findById(decoded.userId) :
                await doctorsRepository.findById(decoded.userId)
            if (!user) throw errors.unauthorizedError();

            res.locals.user = { ...user, userType: decoded.userType };
            next();
        } catch (err) {
            next(err);
        }
    })
}

export default authentication;