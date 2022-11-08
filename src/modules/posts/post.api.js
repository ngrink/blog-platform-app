import { $axios } from "../../utils/libs/axios";


export class PostAPI {
    static async createPost(postData) {
        const { data } = await $axios.post(`/posts/`, {...postData});
        return data;
    }

    static async getAllPosts() {
        const { data } = await $axios.get(`/posts/`);
        return data;
    }

    static async getPost(postId) {
        const { data } = await $axios.get(`/posts/${postId}`);
        return data;
    }

    static async updatePost(postId, postData) {
        const { data } = await $axios.patch(`/posts/${postId}`, {...postData});
        return data;
    }

    static async deletePost(postId) {
        const { data } = await $axios.delete(`/posts/${postId}`);
        return data;
    }

    static async publicatePost(postId) {
        const { data } = await $axios.post(`/posts/${postId}/publish`);
        return data;
    }

    static async likePost(postId) {
        const { data } = await $axios.post(`/posts/${postId}/like`);
        return data;
    }

    static async unlikePost(postId) {
        const { data } = await $axios.post(`/posts/${postId}/unlike`);
        return data;
    }

    static async getPostComments(postId) {
        const { data } = await $axios.get(`/posts/${postId}/comments`);
        return data;
    }

    static async createPostComment(postId, commentData) {
        const { data } = await $axios.post(`/posts/${postId}/comments`, {...commentData});
        return data;
    }
}
