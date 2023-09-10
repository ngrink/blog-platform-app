import Joi from "joi";
import { ApiError } from "../../api.exceptions";


export class PostValidator {
    static createPost(data) {
        const validation = Joi.object({
            title: Joi.string()
                .required(),
            author: Joi.string()
                .required(),
            content: Joi.object()
                .required(),
            slug: Joi.string()
                .pattern(new RegExp(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)),
            tags: Joi.array(),
            description: Joi.string(),
            preview: Joi.string()
        }).validate(data, { abortEarly: false, allowUnknown: false });

        if (validation.error) {
            throw ApiError.ValidationError(validation.error.details);
        }
    }

    static updatePost(data) {
        const validation = Joi.object({
            title: Joi.string(),
            content: Joi.object(),
            tags: Joi.array(),
            description: Joi.string(),
            preview: Joi.string().allow(null)
        }).validate(data, { abortEarly: false, allowUnknown: false });

        if (validation.error) {
            throw ApiError.ValidationError(validation.error.details);
        }
    }
}
