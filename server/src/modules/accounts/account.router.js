import express from "express";
import { AccountController } from "./account.controller";


const router = express.Router({ mergeParams: true });
router.post("/", AccountController.createAccount)

export { router as AccountRouter };
