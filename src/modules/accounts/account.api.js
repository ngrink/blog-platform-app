import { $axios } from "../../utils/libs/axios";


export class AccountAPI {
    static async createAccount(username, email, password, confirmPassword) {
        $axios.post('/auth/login', {username, email, password, confirmPassword})
    }
}
