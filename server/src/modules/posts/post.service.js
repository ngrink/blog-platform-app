import Joi from "joi";
import { slug } from "slug-gen";

import { PostModel } from "./post.model";
import { PostValidator } from "./post.validator";
import { PostError } from "./post.exceptions";


export class PostService {
    static async createPost(data) {
        PostValidator.createPost(data);

        if (!data.slug) {
            data.slug = slug(data.title);
        }

        const post = await PostModel.create(data);
        return post
    }

    static async getAllPosts(filter) {
        const posts = await PostModel.find(filter);
        return posts
    }

    static async getPost(postId) {
        const post = await PostModel.findById(postId);
        return post
    }

    static async updatePost(postId, data) {
        PostValidator.updatePost(data);

        const post = await PostModel.findByIdAndUpdate(postId, data, {new: true});
        return post
    }

    static async deletePost(postId) {
        await PostModel.findByIdAndDelete(postId);
    }

    static async publicatePost(postId) {
        const updated = await PostModel.findByIdAndUpdate(postId, {published: true});
        if (!updated) {
            throw PostError.PostNotFound()
        }
    }

    static async likePost(accountId, postId) {
        await PostModel.findByIdAndUpdate(postId, {$push: {likes: accountId}});
    }

    static async unlikePost(accountId, postId) {
        await PostModel.findByIdAndUpdate(postId, {$pull: {likes: accountId}});
    }

    static async getPostComments(postId) {
        const comments = await PostModel.findById(postId, {comments: 1});
        return comments
    }

    static async createPostComment(accountId, postId, comment) {
        await PostModel.findByIdAndUpdate(
            postId,
            {$push: {comments: {
                author: accountId,
                comment
            }}}
        );
    }

    static async checkPostOwner(postId, accountId) {
        return await PostModel.exists({
            postId,
            author: accountId
        })
    }
}
