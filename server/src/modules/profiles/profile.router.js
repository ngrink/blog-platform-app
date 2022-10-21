import express from "express";
import { AuthMiddleware } from "../auth";
import { ProfileMiddleware } from "./profile.middleware";
import { ProfileController } from "./profile.controller";


const router = express.Router({ mergeParams: true });

router.get("/",
    ProfileController.getProfile
)
router.patch("/",
    [AuthMiddleware.authorized,
    ProfileMiddleware.profileOwner],
    ProfileController.updateProfile
)

export { router as ProfileRouter };
