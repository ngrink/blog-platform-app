import { FileService } from "../../utils/file/file.service";
import { PostService } from "./post.service";


export class PostController {
    static async createPost(req, res, next) {
        try {
            const { accountId } = req.token
            const body = req.body;
            const preview = req.files?.preview;
            let previewPath;

            if (preview) {
                previewPath = await FileService.saveUserFile(accountId, preview);
            }

            const post = await PostService.createPost({
                ...body, 
                tags: body.tags.split(","), 
                content: JSON.parse(body.content), 
                author: accountId, 
                preview: previewPath? FileService.relativeToProjectPath(previewPath) : null
            });
            res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }

    static async getAllPosts(req, res, next) {
        try {
            const { accountId } = req.token;
            const { page, limit, feed, author, range, query } = req.query;

            const posts = await PostService.getAllPosts(accountId, {page, limit, feed, author, range, query});
            res.status(200).json(posts);
        } catch (e) {
            next(e);
        }
    }

    static async getPost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const post = await PostService.getPost(accountId, postId);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;
            const data = req.body;
            const preview = req.files?.preview;
            let previewPath;

            if (preview) {
                previewPath = await FileService.saveUserFile(accountId, preview);
            }

            const updated = await PostService.updatePost(postId, {
                ...data, 
                tags: data.tags.split(","), 
                content: JSON.parse(data.content), 
                preview: preview ? FileService.relativeToProjectPath(previewPath) : null
            });
            res.status(200).json(updated);
        } catch (e) {
            next(e);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { postId } = req.params;

            await PostService.deletePost(postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async publicatePost(req, res, next) {
        try {
            const { postId } = req.params;

            await PostService.publicatePost(postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async likePost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const post = await PostService.likePost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async unlikePost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            await PostService.unlikePost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async bookmarkPost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            await PostService.bookmarkPost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async unbookmarkPost(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            await PostService.unbookmarkPost(accountId, postId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async getPostComments(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;

            const comments = await PostService.getPostComments(accountId, postId);
            res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    static async createPostComment(req, res, next) {
        try {
            const { accountId } = req.token;
            const { postId } = req.params;
            const { comment } = req.body

            await PostService.createPostComment(accountId, postId, comment);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async deletePostComment(req, res, next) {
      try {
          const { accountId } = req.token;
          const { postId, commentId } = req.params;

          await PostService.deletePostComment(postId, commentId);
          res.status(200).json("OK");
      } catch (e) {
          next(e);
      }
  }

    static async generateRandomPost(req, res, next) {
        try {
            const { accountId } = req.token;

            const post = await PostService._generateRandomPost(accountId);
            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    }
}
