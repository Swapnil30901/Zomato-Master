import joi from "joi";

export const ValidateSignup = (userData) => {
  const Schema = joi.object({
    fullname: joi.string().required().min(5).max(30),
    email: joi.string().email().required(),
    password: joi.string().min(5),
    address: joi
      .array()
      .items(joi.object({ detail: joi.string(), for: joi.string() })),
    // phoneNumber: joi.number().min(10).max(10)
    phoneNumber : joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
        'number.min': 'Mobile number should be 10 digit.',
        'number.max': 'Mobile number should be 10 digit'
    })
  });

  return Schema.validateAsync(userData);
};

export const ValidateSignin = (userData) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
  });

  return Schema.validateAsync(userData);
};