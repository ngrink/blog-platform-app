import Joi from "joi";
import { ApiError } from "../../api.exceptions";


export class AccountValidator {
    static updateProfile(data) {
        const validation = Joi.object({
            fullname: Joi.string(),
            about: Joi.string(),
            avatar: Joi.string(),
            socials: Joi.array()
                .items(Joi.object({
                    type: Joi.string(),
                    url: Joi.string()
                }))
        }).validate(data, { abortEarly: false, allowUnknown: false });

        if (validation.error) {
            throw ApiError.ValidationError(validation.error.details);
        }
    }
}
