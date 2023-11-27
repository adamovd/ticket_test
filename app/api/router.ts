import { ticketRouter } from "./Routes/ticketRoutes";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.API_KEY as string;

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});
console.log(uri);

app.use("/api/v1/tickets", ticketRouter);

const port = process.env.PORT || 5127;

const runDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(uri);
    console.log(`🎇 MongoDB connected: ${connect.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
runDB();
