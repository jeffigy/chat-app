import Joi from "joi";

export const signUpSchema = Joi.object({
  fullName: Joi.string().required().label("Full name"),
  email: Joi.string().required().label("Email"),
  password: Joi.string().min(12).required().label("Password"),
}).options({ errors: { wrap: { label: false } } });
