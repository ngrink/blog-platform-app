import express from "express";
import { AccountRouter } from "./modules/accounts/";
import { AuthRouter } from "./modules/auth";
import { PostRouter } from "./modules/posts";


const router = express.Router({ mergeParams: true });
router.use("/accounts/", AccountRouter)
router.use("/auth/", AuthRouter)
router.use("/posts/", PostRouter)

export { router };
