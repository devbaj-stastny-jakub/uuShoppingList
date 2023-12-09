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

app.use(cors({credentials: true, origin: true}))
app.use(express.json({limit: "50mb"}));

app.use("/shoppingList", shoppingListRouter)
app.use("/shoppingListItem", shoppingListItemRouter)

app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})

app.use(errorHandler)
app.listen(3002, ()=>{
    console.log("server is running at port 3002")
})
