// const data = "2023-04-02";
// const horario = "17:00";
// const checkin = "09:00";
// const checkout = "18:00";
// const consulta = dayjs(data + horario).day() > 0 && dayjs(data + horario).day() < 6;
// isBetween((data + checkin), (data + checkout), 'hour');

// console.log(consulta);
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween.js";
// dayjs.extend(isBetween)

import appointmentsServices from "../services/appointments.services.js";

async function byUserId(req, res, next) {
  try {
    //     const {
    //       rows: [appointments],
    //     } = await appointmentsServices.signup({});
    //     return res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function byDoctorId(req, res, next) {
  try {
    //     const {
    //       rows: [appointments],
    //     } = await appointmentsServices.signup({});
    //     return res.send({ appointments });
  } catch (err) {
    next(err);
  }
}

async function confirm(req, res, next) {
  try {
    //     await appointmentsServices.signup({});
    //     return res.sendStatus(202);
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
  byUserId,
  byDoctorId,
  confirm,
  create,
};
