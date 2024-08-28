import Joi from "joi";

export default {
    registration: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.boolean().optional()

    }),
    login: Joi.object({
        email: Joi.string().trim().email({minDomainSegments: 2}).required(),
        password: Joi.string().min(8).required(),
    })
}