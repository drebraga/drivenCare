import dayjs from "dayjs";
import errors from "../errors/index.js";
import appointmentsRepo from "../repositories/appointments.repository.js";
import doctorsRepository from "../repositories/doctors.repository.js";
import usersRepository from "../repositories/users.repository.js";

async function create({ doctorId, userId, day, time }) {
  const { rowCount } = await appointmentsRepo.findDuplicate({
    doctorId,
    day,
    time,
  });
  if (rowCount) throw errors.duplicatedAppointmentError();

  await appointmentsRepo.create({ doctorId, userId, day, time });
}

async function confirm({ doctorId, id }) {
  if (isNaN(id)) throw errors.invalidId();
  const { rowCount } = await appointmentsRepo.findById({
    status: false,
    doctorId,
    id,
  });
  if (!rowCount) throw errors.appointmentNotFound();

  await appointmentsRepo.confirm({ status: true, doctorId, id });
}

async function patientSchedule({ id }) {
  const date = dayjs().format("DD/MM/YYYY");
  return await appointmentsRepo.findByPatientId({ date, id });
}

async function doctorSchedulePatient({ id }) {
  const date = dayjs().format("DD/MM/YYYY");

  const { rowCount } = await doctorsRepository.findById(id);
  if (!rowCount) throw errors.doctorNotFound();

  return await appointmentsRepo.findByDoctorId({ date, id });
}

async function doctorScheduleDoctor({ id }) {
  const date = dayjs().format("DD/MM/YYYY");
  return await appointmentsRepo.findByDoctorIdvDoc({ date, id });
}

async function history({ id }) {
  const date = dayjs().format("DD/MM/YYYY");

  const { rowCount } = await usersRepository.findById(id);
  if (!rowCount) throw errors.patientNotFound();

  return await appointmentsRepo.history({
    date,
    id,
    confirmed: true,
    canceled: false,
  });
}

export default {
  create,
  confirm,
  patientSchedule,
  doctorSchedulePatient,
  doctorScheduleDoctor,
  history,
};
