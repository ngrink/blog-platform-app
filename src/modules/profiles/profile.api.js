import { $axios } from "../../utils/libs/axios";


export class ProfileAPI {
    static async getProfile(accountId) {
        return await $axios.get(`/accounts/${accountId}/profile/`, {})
    }

    static async updateProfile(accountId, profileData) {
        return await $axios.patch(`/accounts/${accountId}/profile/`, {...profileData})
    }
}
