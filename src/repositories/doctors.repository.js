import db from "../config/config.connection.js";

async function findByEmail(email) {
  return await db.query(
    `
    SELECT * FROM doctors WHERE email=$1
    `,
    [email]
  );
}

async function findById(id) {
  return await db.query(
    `
    SELECT * FROM doctors WHERE id=$1
    `,
    [id]
  );
}

async function findByName(name) {
  return await db.query(
    `
    SELECT
        id, name, specialty, address
    FROM doctors 
    WHERE name LIKE $1
    `,
    [name]
  );
}

async function findBySpecialty(specialty) {
  return await db.query(
    `
    SELECT
        id, name, specialty, address
    FROM doctors 
    WHERE specialty LIKE $1
    `,
    [specialty]
  );
}

async function findByLocalization(localization) {
  return await db.query(
    `
    SELECT
        id, name, specialty, address
    FROM doctors 
    WHERE address LIKE $1
    `,
    [localization]
  );
}

async function newUser({
  name,
  email,
  password,
  checkin,
  checkout,
  address,
  specialty,
}) {
  return await db.query(
    `
    INSERT INTO doctors
        (name, email, password, checkin, checkout, address, specialty)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [name, email, password, checkin, checkout, address, specialty]
  );
}

export default {
  findByEmail,
  newUser,
  findById,
  findByName,
  findBySpecialty,
  findByLocalization,
};
