import express, { Request, Response, NextFunction } from 'express';
import {shoppingListRouter} from "./routes/shoppingList";
import {shoppingListItemRouter} from "./routes/shoppingListItem";
import cors from "cors"

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json({limit: "50mb"}));

app.use("/shoppingList", shoppingListRouter)
app.use("/shoppingListItem", shoppingListItemRouter)

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
