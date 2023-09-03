import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from 'dotenv';

import { router } from "./server.router";
import { errorHandler } from "./error.handler";
import { PostService } from "./modules/posts";


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
process.env.DEVELOPMENT = process.env.NODE_ENV === "development";

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
        setInterval(() => {
          PostService._computeAndPersistPostRatings();
        }, 1000 * 60 * 60)
    } catch (e) {
        console.log(`[Server]`, e)
    }
}

main();
