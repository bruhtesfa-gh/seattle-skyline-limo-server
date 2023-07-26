import Joi from "joi";
const VehiclePostschema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    model: Joi.string().min(3).max(50).required(),
    img: Joi.string().required(),
    description: Joi.string().max(20000).required(),
    automatic: Joi.number().required(),
    heatedSeat: Joi.number().required(),
    gpsNavigation: Joi.number().required(),
    speed: Joi.number().required().min(0),
    passengerSize: Joi.number().required().min(0),
    pricePerDay: Joi.number().required().min(0),
    type: Joi.string()
        .required()
        .allow(...["SUV", "BUS", "VAN", "SEDAN"]),
});
const VehicleUpdateschema = Joi.object({
    name: Joi.string().min(3).max(50),
    model: Joi.string().min(3).max(50),
    img: Joi.string(),
    description: Joi.string().max(20000).required(),
    speed: Joi.number().min(0),
    passengerSize: Joi.number().min(0),
    pricePerDay: Joi.number().min(0),
    automatic: Joi.number(),
    heatedSeat: Joi.number(),
    gpsNavigation: Joi.number(),
    type: Joi.string().allow(...["SUV", "BUS", "VAN", "SEDAN"]),
});

export { VehiclePostschema, VehicleUpdateschema };