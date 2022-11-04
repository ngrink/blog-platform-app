import { $axios } from "../../utils/libs/axios";


export class ProfileAPI {
    static async getProfile(accountId) {
        $axios.get(`/accounts/${accountId}/profile/`, {})
    }

    static async updateProfile(accountId, profileData) {
        $axios.patch(`/accounts/${accountId}/profile/`, {...profileData})
    }
}
