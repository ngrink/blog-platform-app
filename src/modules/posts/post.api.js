import { $axios } from "../../utils/libs/axios";


export class PostAPI {
    static async createPost(postData) {
        return await $axios.post(`/posts/`, {...postData});
    }

    static async getAllPosts() {
        return await $axios.get(`/posts/`)
    }

    static async getPost(postId) {
        return await $axios.get(`/posts/${postId}`)
    }

    static async updatePost(postId, postData) {
        return await $axios.patch(`/posts/${postId}`, {...postData})
    }

    static async deletePost(postId) {
        return await $axios.delete(`/posts/${postId}`)
    }

    static async publicatePost(postId) {
        return await $axios.post(`/posts/${postId}/publish`)
    }

    static async likePost(postId) {
        return await $axios.post(`/posts/${postId}/like`)
    }

    static async unlikePost(postId) {
        return await $axios.post(`/posts/${postId}/unlike`)
    }

    static async getPostComments(postId) {
        return await $axios.get(`/posts/${postId}/comments`)
    }

    static async createPostComment(postId, commentData) {
        return await $axios.post(`/posts/${postId}/comments`, {...commentData})
    }
}
