import db from "../config/config.connection.js";

async function findByEmail(email) {
    return await db.query(
        `
        SELECT * FROM patients WHERE email=$1
        `,
        [email]
    );
}

async function findById(id) {
    return await db.query(
        `
        SELECT * FROM patients WHERE id=$1
        `,
        [id]
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
    findByEmail, newUser, findById
};