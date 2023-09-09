import { $axios } from "../../utils/libs/axios";



export class AccountAPI {
    static async createAccount(fullname, username, email, password, confirmPassword) {
        const { data } = await $axios.post('/accounts/',
        {
            profile: {
                fullname
            },
            username,
            email,
            password,
            confirmPassword
        })
        return data;
    }

    static async getProfile(accountId) {
        const { data } = await $axios.get(`/accounts/${accountId}/profile/`);
        return data;
    }

    static async updateProfile(accountId, profileData) {
        const { data } = await $axios.patch(`/accounts/${accountId}/profile/`, {...profileData});
        return data;
    }

    static async followUser(accountId) {
        await $axios.post(`/accounts/${accountId}/follow/`);
    }

    static async unfollowUser(accountId) {
        await $axios.post(`/accounts/${accountId}/unfollow/`);
    }
}
