import Joi from "joi";
import bcrypt from "bcrypt";

import { AccountModel } from "./account.model";
import { AccountError } from "./account.exceptions";


export class AccountService {
    static async createAccount(username, email, password, confirmPassword) {
        const validation = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(4)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,100}$"))
                .required(),
            confirmPassword: Joi.ref('password')
        }).validate(
            { username, email, password, confirmPassword },
            { abortEarly: false, allowUnknown: false, presence: "required" }
        );

        if (validation.error) {
            throw AccountError.BadRequest("Not all request fields are specified correctly", validation.error.details);
        }

        const usernameExists = await AccountModel.findOne({username})
        if (usernameExists) {
            throw AccountError.UsernameExists()
        }

        const emailExists = await AccountModel.findOne({email})
        if (emailExists) {
            throw AccountError.EmailExists()
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const account = await AccountModel.create({
            username,
            email,
            password: hashedPassword
        })

        return account
    }
}
