import { AccountAPI } from "./account.api";
import { store } from "../../app/store";
import { toast } from "../../utils/libs/chakra/toast";
import { toastError, toastSuccess } from "../../utils/helpers/toasts";


export class AccountService {
    static async createAccount(fullname, username, email, password, confirmPassword) {
        const account = await AccountAPI.createAccount(fullname, username, email, password, confirmPassword);
        return account;
    }

    static async getProfile(accountId) {
        const data = await AccountAPI.getProfile(accountId);

        store.AccountStore.setUsername(data.username);
        store.AccountStore.setProfile(data.profile);
        store.AccountStore.setFollows(data.follows);
        store.AccountStore.setBookmarks(data.bookmarks);

        return data;
    }

    static async updateProfile(accountId, profileData) {
        const profile = await AccountAPI.updateProfile(accountId, profileData);
        return profile;
    }

    static async followUser(accountId) {
        try {
            await AccountAPI.followUser(accountId);
            store.AccountStore.followUser(accountId);
            toast(toastSuccess({title: "Вы подписались на пользователя"}));
        } catch (e) {
            toast(toastError({title: "Подписка не удалась, попробуйте позже"}));
        }
    }

    static async unfollowUser(accountId) {
        try {
            await AccountAPI.unfollowUser(accountId);
            store.AccountStore.unfollowUser(accountId);
            toast(toastSuccess({title: "Вы отписались от пользователя"}));
        } catch (e) {
            toast(toastError({title: "Не удалось отписаться от пользователя"}));
        }
    }
}
