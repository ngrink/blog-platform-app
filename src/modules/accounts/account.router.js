import express from "express";
import { AuthMiddleware } from "../auth"
import { AccountController } from "./account.controller";


const router = express.Router({ mergeParams: true });

router.post("/",
    AccountController.createAccount
)
router.get("/:accountId/profile",
    AccountController.getProfile
)
router.patch("/:accountId/profile",
    [AuthMiddleware.authorized],
    AccountController.updateProfile
)

export { router as AccountRouter };
