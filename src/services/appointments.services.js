import errors from "../errors/index.js";
import appointmentsRepo from "../repositories/appointments.repository.js";

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

export default {
  create,
  confirm,
};
