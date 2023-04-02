import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"
import errors from "../errors/index.js";
import userRepositories from "../repositories/users.repository.js";
import doctorRepositories from "../repositories/doctors.repository.js";

async function signup({ name, email, password }) {
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.newUser({ name, email, password: hashPassword })
}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({ userId: user.id, userType: "patient" }, process.env.SECRET_JWT);

    return token;
}

async function doctorsByName({ name }) {
    const pattern = `%${name}%`;
    const doctors = await doctorRepositories.findByName(pattern);

    return doctors;
}

async function doctorsBySpecialty({ specialty }) {
    const pattern = `%${specialty}%`;
    const doctors = await doctorRepositories.findBySpecialty(pattern);

    return doctors;
}

async function doctorsByLocalization({ localization }) {
    const pattern = `%${localization}%`;
    const doctors = await doctorRepositories.findByLocalization(pattern);

    return doctors;
}

export default {
    signup, signin, doctorsByName,
    doctorsBySpecialty, doctorsByLocalization
}