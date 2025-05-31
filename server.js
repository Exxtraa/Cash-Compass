import express from "express";
import dotenv from "dotenv";
import { initDB, sql } from "./config/db.js";
import Ratelimiter from "./middleware/rateLimiter.js"
import transactionRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production")job.start()

const PORT = process.env.PORT || 5001;

//MIDDLEWARE
app.use(express.json());
app.use(Ratelimiter);



app.use("/api/transactions",transactionRoute)

app.get("/api/health",(req,res) => {
    res.status(200).json({ Status : "ok"});
})

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running at:", PORT);
  });
});
