import express from "express";
import { AccountRouter } from "./modules/accounts/";
import { AuthRouter } from "./modules/auth";


const router = express.Router({ mergeParams: true });
router.use("/accounts/", AccountRouter)
router.use("/auth/", AuthRouter)

export { router };
