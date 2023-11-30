import { countryRouter } from "./Routes/countryRoutes";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const uri =
  (process.env.MONGODB_URI as string) ||
  "mongodb+srv://adamovd:YNWA1892-sg8@cluster0.tgv4sum.mongodb.net/CountriesDB";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://country-test-jade.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/countries", countryRouter);

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
