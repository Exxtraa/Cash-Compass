import express from "express";
import dotenv from "dotenv";
import { initDB, sql } from "./config/db.js";
import Ratelimiter from "./middleware/rateLimiter.js"
import transactionRoute from "./routes/transactionsRoute.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//MIDDLEWARE
app.use(express.json());
app.use(Ratelimiter);



app.use("/api/transactions",transactionRoute)

app.get("/health",(req,res) => {
    res.send("all working fine");
    console.log("works well")
})

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running at:", PORT);
  });
});
