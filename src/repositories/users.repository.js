import db from "../config/config.connection.js";

async function findByEmail(email) {
    return await db.query(
        `
        SELECT * FROM patients WHERE email=$1
        `,
        [email]
    );
}

async function newUser({ name, email, password }) {
    return await db.query(
        `
        INSERT INTO patients
            (name, email, password)
        VALUES ($1, $2, $3)
        `,
        [name, email, password]
    );
}

export default {
    findByEmail, newUser
};