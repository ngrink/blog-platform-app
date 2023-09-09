import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";


export class AccountStore {
    username = null;
    profile = null;
    follows = [];
    bookmarks = [];

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'AccountStore',
            properties: [
                'username',
                'profile',
                'follows',
                'bookmarks',
            ],
            storage: window.localStorage
        })
    }

    setUsername(username) {
        this.username = username;
    }

    setProfile(profile) {
        this.profile = profile;
    }

    setFollows(follows) {
        this.follows = follows;
    }

    setBookmarks(bookmarks) {
        this.bookmarks = bookmarks;
    }

    followUser(authorId) {
        this.follows.count += 1;
        this.follows.items.push(authorId);
    }

    unfollowUser(authorId) {
        this.follows.count -= 1;
        this.follows.items = this.follows.items.filter(id => id !== authorId);
    }

    unsetData() {
        this.username = null;
        this.profile = null;
        this.follows = null;
        this.bookmarks = null;
    }
}
