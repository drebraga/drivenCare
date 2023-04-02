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

async function findByDoctorId(id) {
  return await db.query(
    `
    SELECT * FROM appointments WHERE "userId"=$1
    `,
    [id]
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
  findByDoctorId,
};
