import { $axios } from "../../utils/libs/axios";


export class AuthAPI {
    static async login(login, password) {
        const { data } = await $axios.post('/auth/login', {login, password});
        return data;
    }

    static async logout() {
        const { data } = await $axios.post('/auth/logout');
        return data;
    }

    static async refresh() {
        const { data } = await $axios.post('/auth/refresh');
        return data;
    }
}
