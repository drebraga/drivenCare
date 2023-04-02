import doctorServices from "../services/doctors.services.js";

async function signUp(req, res, next) {
  const { name, email, password, checkin, checkout, address, specialty } =
    req.body;
  try {
    await doctorServices.signup({
      name,
      email,
      password,
      checkin,
      checkout,
      address,
      specialty,
    });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await doctorServices.signin({ email, password });

    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function doctorsByName(req, res, next) {
  const { name } = req.params;
  try {
    const { rows: doctors } = await userServices.doctorsByName({ name });

    return res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function doctorsBySpecialty(req, res, next) {
  const { specialty } = req.params;
  try {
    const { rows: doctors } = await userServices.doctorsBySpecialty({
      specialty,
    });

    return res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

async function doctorsByLocalization(req, res, next) {
  const { localization } = req.params;
  try {
    const { rows: doctors } = await userServices.doctorsByLocalization({
      localization,
    });

    return res.send({ doctors });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  signIn,
  doctorsByName,
  doctorsBySpecialty,
  doctorsByLocalization,
};
