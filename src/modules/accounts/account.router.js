import express from "express";
import { AuthMiddleware } from "../auth"
import { AccountController } from "./account.controller";
import { AccountMiddleware } from "./account.middleware";


const router = express.Router({ mergeParams: true });

router.post("/",
    AccountController.createAccount
)
router.get("/:accountId/profile",
    AccountController.getProfile
)
router.patch("/:accountId/profile",
    [AuthMiddleware.authorized,
    AccountMiddleware.accountOwner],
    AccountController.updateProfile
)

export { router as AccountRouter };
