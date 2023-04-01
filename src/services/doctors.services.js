import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"
import errors from "../errors/index.js";
import doctorsRepository from "../repositories/doctors.repository.js";

async function signup({ name, email, password, checkin, checkout, address, specialty }) {
    const { rowCount } = await doctorsRepository.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorsRepository.newUser({ name, email, password: hashPassword, checkin, checkout, address, specialty })
}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await doctorsRepository.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({ userId: user.id, userType: "doctor" }, process.env.SECRET_JWT);

    return token;
}

export default {
    signup, signin
}