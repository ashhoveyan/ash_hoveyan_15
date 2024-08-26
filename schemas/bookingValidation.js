import Joi from 'joi';

export default {
    bookingSchema: Joi.object({
        showtimeId: Joi.number().required(),
        seatNumber: Joi.string().required()
    }),

}