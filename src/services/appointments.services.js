import errors from "../errors/index.js";
import appointmentsRepo from "../repositories/appointments.repository.js";

async function create({ doctorId, userId, day, time }) {
  const { rowCount } = await appointmentsRepo.findDuplicate({
    doctorId, day, time
  });
  if (rowCount) throw errors.duplicatedAppointmentError();

  await appointmentsRepo.create({ doctorId, userId, day, time });
}

export default {
  create,
};
