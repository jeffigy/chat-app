import Joi from "joi";

const baseAuthSchema = Joi.object({
  email: Joi.string().required().label("Email"),
}).options({ errors: { wrap: { label: false } } });

export const logInSchema = baseAuthSchema.keys({
  password: Joi.string().required().label("Password"),
});

export const signUpSchema = baseAuthSchema.keys({
  fullName: Joi.string().required().label("Full name"),
  password: Joi.string().min(12).required().label("Password"),
});

export const logOutSchema = Joi.object({
  jwt: Joi.string().required(),
});
