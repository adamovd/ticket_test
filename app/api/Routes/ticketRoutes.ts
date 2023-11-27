import express from "express";
import { createTicket, getAllTickets } from "../Controllers/ticketController";

const router = express.Router();

router.get("/", getAllTickets);

router.post("/", createTicket);

export { router as ticketRouter };
