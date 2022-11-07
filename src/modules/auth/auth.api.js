import { $axios } from "../../utils/libs/axios";


export class AuthAPI {
    static async login(login, password) {
        return await $axios.post('/auth/login', {login, password})
    }

    static async logout() {
        return await $axios.post('/auth/logout')
    }

    static async refresh() {
        return await $axios.post('/auth/refresh')
    }
}
