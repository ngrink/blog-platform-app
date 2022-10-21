import express from "express";
import { AuthMiddleware } from "../auth";
import { PostMiddleware } from "./post.middleware";
import { PostController } from "./post.controller";


const router = express.Router({ mergeParams: true });

router.post("/",
    [AuthMiddleware.authorized],
    PostController.createPost
)
router.get("/",
    PostController.getAllPosts
)
router.get("/:postId",
    PostController.getPost
)
router.patch("/:postId",
    [AuthMiddleware.authorized,
    PostMiddleware.postOwner],
    PostController.updatePost
)
router.delete("/:postId",
    [AuthMiddleware.authorized,
    PostMiddleware.postOwner],
    PostController.deletePost
)
router.post("/:postId/publish",
    [AuthMiddleware.authorized,
    PostMiddleware.postOwner],
    PostController.publicatePost
)
router.post("/:postId/like",
    [AuthMiddleware.authorized],
    PostController.likePost
)
router.post("/:postId/unlike",
    [AuthMiddleware.authorized],
    PostController.unlikePost
)
router.get("/:postId/comments",
    [AuthMiddleware.authorized],
    PostController.getPostComments
)
router.post("/:postId/comments",
    [AuthMiddleware.authorized],
    PostController.createPostComment
)

export { router as PostRouter };
