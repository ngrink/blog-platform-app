import express from "express";
import * as dotenv from 'dotenv';
dotenv.config({ path: `src/.env.${process.env.NODE_ENV}` });

import { router } from "./server.router";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", router);


async function main() {
    try {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, (error) => {
            error
                ? console.log(`[Server]`, error)
                : console.log(`[Server] Server is started on PORT ${PORT}`)
        })
    } catch (e) {
        console.log(`[Server]`, e)
    }
}

main();
