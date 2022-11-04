import Joi from "joi";

import { ProfileModel } from "./profile.model";
import { ProfileError } from "./profile.exceptions";
import { ProfileValidator } from "./profile.validator";


export class ProfileService {
    static async createProfile(accountId) {
        const profile = await ProfileModel.create({accountId});
        return profile
    }

    static async getProfile(accountId) {
        const profile = await ProfileModel.findOne({accountId});
        return profile
    }

    static async updateProfile(accountId, data) {
        ProfileValidator.updateProfile(data);

        const profile = await ProfileModel.findOneAndUpdate({accountId}, data, {new: true});
        if (!profile) {
            throw ProfileError.profileNotFound();
        }

        return profile
    }
}
