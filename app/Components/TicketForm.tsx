"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TicketForm = () => {
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not Started",
    category: "Hardware Problem",
  };

  const [formData, setFormData] = useState(startingTicketData);
  return <div className="flex justify-center">
    <form action="">
        <h3>Create Your Ticket</h3>
        <label>Title</label>
    </form>
  </div>;
};

export default TicketForm;
