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
    [AuthMiddleware.optionalAuthorized],
    PostController.getAllPosts
)
router.get("/:postId",
    [AuthMiddleware.optionalAuthorized],
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
router.post("/:postId/bookmark",
    [AuthMiddleware.authorized],
    PostController.bookmarkPost
)
router.post("/:postId/unbookmark",
    [AuthMiddleware.authorized],
    PostController.unbookmarkPost
)
router.get("/:postId/comments",
    [AuthMiddleware.optionalAuthorized],
    PostController.getPostComments
)
router.post("/:postId/comments",
    [AuthMiddleware.authorized],
    PostController.createPostComment
)
router.delete("/:postId/comments/:commentId",
    [AuthMiddleware.authorized],
    PostController.deletePostComment
)

router.post("/generate",
    [AuthMiddleware.authorized],
    PostController.generateRandomPost
)

export { router as PostRouter };
