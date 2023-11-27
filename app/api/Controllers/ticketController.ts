import { Ticket } from "../../Models/Ticket";
import { Request, Response } from "express";

export const getAllTickets = async (req: Request, res: Response) => {
  const tickets = await Ticket.find();
  const totalAmount = await Ticket.countDocuments();

  return res.json({
    data: tickets,
    meta: {
      count: tickets.length,
      total: totalAmount,
    },
  });
};

export const createTicket = async (req: Request, res: Response) => {
  const { title, description, category, priority } = req.body;
  try {
    const ticket = Ticket.create({
      title,
      description,
      category,
      priority,
    });

    (await ticket).save();
    console.log(ticket);
    return res.status(201).json(ticket);
  } catch (error: unknown) {
    return res.status(500).json({ message: error });
  }
};
