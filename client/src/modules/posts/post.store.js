import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";


export class PostStore {
    searchQuery = ""

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'PostStore',
            properties: [
                'searchQuery',
            ],
            storage: window.localStorage
        })
    }

    setSearchQuery(value) {
        this.searchQuery = value.toLowerCase().trim()
    }
}
