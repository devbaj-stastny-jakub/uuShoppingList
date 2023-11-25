import express, {Request, Response, NextFunction} from 'express';
import {shoppingListRouter} from "./routes/shoppingList";
import {shoppingListItemRouter} from "./routes/shoppingListItem";
import cors from "cors"
import {errorHandler} from "./middlewares";
import {PrismaClient} from "@prisma/client";
import * as fs from "fs";
import * as https from "https";

const app = express();
const port = 3001;
export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json({limit: "50mb"}));

app.use("/shoppingList", shoppingListRouter)
app.use("/shoppingListItem", shoppingListItemRouter)

app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})

app.use(errorHandler)

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(3001, () => {
        console.log("server is runing at port 3001");
    });
