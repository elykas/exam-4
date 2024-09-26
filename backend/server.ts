import  express, { Application }  from "express";
import routerBeepers from "./routes/biperRoute.js";
import dotenv from "dotenv";

dotenv.config();

const PORT:number = parseInt(process.env.PORT || "3000", 10);
const app: Application = express();
app.use(express.json())

app.use('/beepers',routerBeepers)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});