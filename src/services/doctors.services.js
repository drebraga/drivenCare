import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"
import errors from "../errors/index.js";
import doctorsRepo from "../repositories/doctors.repository.js";

async function signup({ name, email, password, checkin, checkout, address, specialty }) {
    const { rowCount } = await doctorsRepo.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorsRepo.newUser({ name, email, password: hashPassword, checkin, checkout, address, specialty })
}

async function signin({ email, password }) {
    const { rowCount, rows: [user] } = await doctorsRepo.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({ userId: user.id, userType: "doctor" }, process.env.SECRET_JWT);

    return token;
}

async function doctorsByName({ name }) {
    const pattern = `%${name}%`;
    const doctors = await doctorsRepo.findByName(pattern);

    return doctors;
}

async function doctorsBySpecialty({ specialty }) {
    const pattern = `%${specialty}%`;
    const doctors = await doctorsRepo.findBySpecialty(pattern);

    return doctors;
}

async function doctorsByLocalization({ localization }) {
    const pattern = `%${localization}%`;
    const doctors = await doctorsRepo.findByLocalization(pattern);

    return doctors;
}

export default {
    signup, signin, doctorsByName,
    doctorsBySpecialty, doctorsByLocalization
}