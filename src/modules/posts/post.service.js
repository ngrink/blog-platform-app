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

    static async getAllPosts(accountId, options) {
        const data = await PostModel.find(
            {published: true},
            {content: 0}
        );

        const posts = data.map(item => {
            let post = item._doc;
            post.likes.isLikedByUser =  post.likes.items.includes(accountId);
            post.comments.isCommentedByUser = post.comments.items.filter(c => c.author == accountId).length > 0;
            delete post.likes.items;
            delete post.comments.items;

            return post
        })

        return posts
    }

    static async getPost(postId) {
        const post = await PostModel.findById(
            postId,
            {comments: 0}
        );
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
        const post = await PostModel.findById(postId, {likes: 1})
        if (post.likes.items.includes(accountId)) {
            throw PostError.PostAlreadyLikedByUser()
        }

        post.likes.count += 1;
        post.likes.items.push(accountId);
        await post.save();
    }

    static async unlikePost(accountId, postId) {
        const post = await PostModel.findById(postId, {likes: 1})
        if (!post.likes.items.includes(accountId)) {
            throw PostError.PostNotLikedByUser()
        }

        post.likes.count -= 1;
        post.likes.items = post.likes.items.filter(item => item !== accountId);
        await post.save();
    }

    static async getPostComments(accountId, postId) {
        const post = await PostModel.findById(postId, {comments: 1});
        if (!post) {
            throw PostError.PostNotFound();
        }

        const comments = post._doc.comments;
        comments.isCommentedByUser = comments.items.filter(c => c.author === accountId) > 0;
        return comments
    }

    static async createPostComment(accountId, postId, comment) {
        const post = await PostModel.findByIdAndUpdate(
            postId,
            {
                $inc: {"comments.count": 1},
                $push: {"comments.items": {
                    author: accountId,
                    comment
                }}
            }
        );
        if (!post) {
            throw PostError.PostNotFound();
        }
    }

    static async checkPostOwner(postId, accountId) {
        return await PostModel.exists({
            postId,
            author: accountId
        })
    }
}
