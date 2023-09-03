import { $axios } from "./axios.config";
import { AuthAPI, AuthContext, useAuth } from "../../../modules/auth";


export const unauthorizedInterceptor = async (error) => {
    const config = error.config;

    if (error.response.status === 401 && !error.config?._isRetry) {
        try {
            config._isRetry = true;
            await AuthAPI.refresh();
            return $axios.request(config);
        } catch (e) {
            // resetAuth()
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
}
