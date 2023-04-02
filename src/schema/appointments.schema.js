import Joi from "joi";

const create = Joi.object({
  doctorId: Joi.number().required(),
  day: Joi.string().required(),
  time: Joi.string().required(),
});

export default {
  create,
};
