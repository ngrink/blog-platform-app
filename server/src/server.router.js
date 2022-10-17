import express from "express";
import { AccountRouter } from "./modules/accounts/";


const router = express.Router({ mergeParams: true });
router.use("/accounts/", AccountRouter)

export { router };
