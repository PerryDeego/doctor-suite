// validation.js
import Joi from 'joi';

const addressSchema = Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string().allow(''),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
});

export const doctorSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    speciality: Joi.string().trim().required(),
    degree: Joi.string().trim().required(),
    experience: Joi.string().trim().required(),
    about: Joi.string().trim().required(),
    address: addressSchema.required(),
    available: Joi.string().trim().required(),
    fees: Joi.number().positive().required(),
});