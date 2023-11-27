import { Timestamp } from "mongodb";
import mongoose from "mongoose";

type Ticket = {
  title: string;
  description: string;
  category: string;
  priority: number;
};

interface TicketDoc extends mongoose.Document {
  title: string;
  description: string;
  category: string;
  priority: number;
}

interface TicketModelInterface extends mongoose.Model<TicketDoc> {
  build(attr: Ticket): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: false,
  },
});

const Ticket = mongoose.model<TicketDoc, TicketModelInterface>(
  "Ticket",
  ticketSchema
);

ticketSchema.statics.build = (attr: Ticket) => {
  return new Ticket(attr);
};

export { Ticket };
