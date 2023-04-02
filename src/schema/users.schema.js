import Joi from "joi";

const signUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "br"] },
    })
    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

const signIn = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "br"] },
    })
    .required(),
  password: Joi.string().required(),
});

export default {
  signUp,
  signIn,
};
