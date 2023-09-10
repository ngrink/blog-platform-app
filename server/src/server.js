import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import * as dotenv from 'dotenv';

import { router } from "./server.router";
import { errorHandler } from "./error.handler";
import { PostService } from "./modules/posts";
import { FileService } from "./utils/file/file.service";


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
process.env.DEVELOPMENT = process.env.NODE_ENV === "development";

const app = express();
app.use("/storage", express.static(FileService.storagePath));
app.use(rateLimit({
    windowMs: 60000,
    max: 100
}));
app.use(morgan("dev"))
app.use(express.json({ limit: "20mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use("/api/", router);
app.use(errorHandler)


async function main() {
    try {
        const PORT = process.env.PORT || 5000;

        mongoose.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (error) => error
                ? console.log(`[DB]`, error)
                : console.log(`[DB] Connected to MongoDB`)
        );
        app.listen(PORT, (error) => error
            ? console.log(`[Server]`, error)
            : console.log(`[Server] Server is started on PORT ${PORT}`)
        );

        PostService._generateRandomPost("64fcd0b3122d23c017c925e6");
        setInterval(() => {
          PostService._computeAndPersistPostRatings();
        }, 1000 * 60 * 60)
    } catch (e) {
        console.log(`[Server]`, e)
    }
}

main();
