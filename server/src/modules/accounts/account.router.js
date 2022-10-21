import express from "express";
import { ProfileRouter } from "../profiles";
import { AccountController } from "./account.controller";


const router = express.Router({ mergeParams: true });

router.post("/", AccountController.createAccount)
router.use("/:accountId/profile", ProfileRouter)

export { router as AccountRouter };
