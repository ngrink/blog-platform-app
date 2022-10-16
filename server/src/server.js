import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

import { router } from "./server.router";
import { errorHandler } from "./error.handler";


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
process.env.DEVELOPMENT = process.env.NODE_ENV === "development";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    } catch (e) {
        console.log(`[Server]`, e)
    }
}

main();
