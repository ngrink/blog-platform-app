import { $axios } from "../../utils/libs/axios";


export class AuthAPI {
    static async login(login, password) {
        $axios.post('/auth/login', {login, password})
    }

    static async logout() {
        $axios.post('/auth/logout')
    }

    static async refresh() {
        $axios.post('/auth/refresh')
    }
}
