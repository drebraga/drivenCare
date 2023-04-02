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

async function findByPatientId({ date, id }) {
  return await db.query(
    `
    SELECT 
      a.id, p.name as patient, d.name as doctor,
      d.specialty, a.day, a.time, a.confirmed, a.canceled
    FROM appointments a 
    JOIN patients p ON p.id = a.patient_id
    JOIN doctors d ON d.id = a.doctor_id
    WHERE a.day>=$1 AND a."patient_id"=$2
    ORDER BY a.day ASC
    `,
    [date, id]
  );
}

async function findByDoctorId({ date, id }) {
  return await db.query(
    `
    SELECT 
      a.id, d.name as doctor,
      d.specialty, a.day, a.time, a.confirmed, a.canceled
    FROM appointments a 
    JOIN doctors d ON d.id = a.doctor_id
    WHERE a.day>=$1 AND a."doctor_id"=$2
    ORDER BY a.day ASC
    `,
    [date, id]
  );
}

async function findByDoctorIdvDoc({ date, id }) {
  return await db.query(
    `
    SELECT 
      a.id, p.name as patient, d.name as doctor,
      d.specialty, a.day, a.time, a.confirmed, a.canceled
    FROM appointments a 
    JOIN patients p ON p.id = a.patient_id
    JOIN doctors d ON d.id = a.doctor_id
    WHERE a.day>=$1 AND a."patient_id"=$2
    ORDER BY a.day ASC
    `,
    [date, id]
  );
}

async function history({ date, id, confirmed, canceled }) {
  return await db.query(
    `
    SELECT 
      a.id, p.name as patient, d.name as doctor,
      d.specialty, a.day, a.time
    FROM appointments a 
    JOIN patients p ON p.id = a.patient_id
    JOIN doctors d ON d.id = a.doctor_id
    WHERE a.day<=$1 AND a."patient_id"=$2 AND a.confirmed=$3 AND a.canceled=$4
    ORDER BY a.day ASC
    `,
    [date, id, confirmed, canceled]
  );
}

export default {
  create,
  findDuplicate,
  findById,
  confirm,
  findByPatientId,
  findByDoctorId,
  findByDoctorIdvDoc,
  history,
};
