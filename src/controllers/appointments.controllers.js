import appointmentsServices from "../services/appointments.services.js";

async function history(req, res, next) {
  const { patientId } = req.params;
  try {
    const { rows: history } = await appointmentsServices.history({
      id: patientId,
    });

    return res.send({ history });
  } catch (err) {
    next(err);
  }
}

async function doctorScheduleDoctor(req, res, next) {
  const user = res.locals.user;
  try {
    const { rows: schedule } = await appointmentsServices.doctorScheduleDoctor({
      id: user.id,
    });

    return res.send({ schedule });
  } catch (err) {
    next(err);
  }
}

async function doctorSchedulePatient(req, res, next) {
  const { doctorId } = req.params;
  try {
    const { rows: schedule } = await appointmentsServices.doctorSchedulePatient(
      {
        id: doctorId,
      }
    );

    return res.send({ schedule });
  } catch (err) {
    next(err);
  }
}

async function patientSchedule(req, res, next) {
  const user = res.locals.user;
  try {
    const { rows: schedule } = await appointmentsServices.patientSchedule({
      id: user.id,
    });

    return res.send({ schedule });
  } catch (err) {
    next(err);
  }
}

async function confirm(req, res, next) {
  try {
    const id = +req.params.id;
    const user = res.locals.user;

    await appointmentsServices.confirm({ doctorId: user.id, id });

    return res.sendStatus(202);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  const { doctorId, day, time } = req.body;
  const user = res.locals.user;
  try {
    await appointmentsServices.create({
      doctorId,
      userId: user.id,
      day,
      time,
    });

    return res.sendStatus(202);
  } catch (err) {
    next(err);
  }
}

export default {
  history,
  doctorSchedulePatient,
  doctorScheduleDoctor,
  patientSchedule,
  confirm,
  create,
};
