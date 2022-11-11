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

    static async getAllPosts(accountId, {page=1, limit=10}) {
        if (limit > 25) {
            throw PostError.LimitOptionInvalidValue();
        }

        const paginatedPosts = await PostModel.paginate(
            {published: true},
            {
                "page": page,
                "limit": limit,
                "sort": {createdAt: -1},
                "select": {content: 0},
                "populate": {
                    path: 'author',
                    select: {
                        username: 1,
                        profile: {fullname: 1, avatar: 1}
                    }
                },
            }
        );

        paginatedPosts.docs = paginatedPosts.docs.map(post => {
            const postData = PostService._computePostFields(accountId, post._doc)
            return postData
        })

        return paginatedPosts
    }

    static async getPost(accountId, postId) {
        const post = await PostModel.findById(postId)
            .populate("author", {
                username: 1,
                profile: {fullname: 1, avatar: 1, username: 1}
            });

        if (!post) {
            throw PostError.PostNotFound();
        }
        post.views += 1;
        post.save();

        const postData = PostService._computePostFields(accountId, post._doc);
        return postData
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

    static async _checkPostOwner(postId, accountId) {
        return await PostModel.exists({
            postId,
            author: accountId
        })
    }

    static _computePostFields(accountId, post) {
        post.isPostOwnedByUser = post.author._id == accountId
        post.likes.isLikedByUser =  post.likes.items.includes(accountId);
        post.comments.isCommentedByUser = post.comments.items.filter(c => c.author == accountId).length > 0;
        delete post.likes.items;
        delete post.comments.items;

        return post;
    }
}
