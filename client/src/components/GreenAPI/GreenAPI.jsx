import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function GreenAPI() {
  const [PhoneNo, setPhoneNo] = useState(null);
  const [message, setMessage] = useState(null);

  const apiUrl = import.meta.env.VITE_FRONTEND_ROUTES;

  async function SendMessage() {
    const formattedPN = PhoneNo;
    const chatId = `92${formattedPN}@c.us`;
    const payload = { chatId, message };
    try {
      await axios.post(`${apiUrl}/sendMessage`, payload);
      setMessage("");
    } catch (err) {
      toast.error("Error sending text", {
        className: "toast",
        autoClose: 3000,
      });
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Chat ID"
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={SendMessage}>Send Message</button>
      </div>
    </div>
  );
}
