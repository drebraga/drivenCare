import db from "../config/config.connection.js";

async function findDuplicate({ doctorId, day, time }) {
  return await db.query(
    `
    SELECT *
    FROM appointments
    WHERE 
      doctor_id = $1 and 
      day = $2 and 
      (time BETWEEN $3::time - interval '59 minutes' AND $3::time + interval '59 minutes')
    `,
    [doctorId, day, time]
  );
}

async function findById({ status, doctorId, id }) {
  return await db.query(
    `
    SELECT * FROM appointments WHERE confirmed=$1 AND doctor_id=$2 AND "id"=$3
    `,
    [status, doctorId, id]
  );
}

async function confirm({ status, doctorId, id }) {
  return await db.query(
    `
    UPDATE appointments SET confirmed = $1 WHERE doctor_id=$2 AND "id"=$3 
    `,
    [status, doctorId, id]
  );
}

async function create({ doctorId, userId, day, time }) {
  return await db.query(
    `
    INSERT INTO appointments
      (doctor_id, patient_id, day, time)
    VALUES ($1, $2, $3, $4)
        `,
    [doctorId, userId, day, time]
  );
}

export default {
  create,
  findDuplicate,
  findById,
  confirm,
};
