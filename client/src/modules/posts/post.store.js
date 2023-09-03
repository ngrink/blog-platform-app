import { makeAutoObservable } from "mobx"


export class PostStore {
    searchQuery = ""

    constructor() {
        makeAutoObservable(this)
    }

    setSearchQuery(value) {
        this.searchQuery = value.toLowerCase().trim()
    }
}
