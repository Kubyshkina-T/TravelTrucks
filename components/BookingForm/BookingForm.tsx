"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { createBookingRequest } from "@/lib/api";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createBookingRequest(camperId, {
        name,
        email,
      });

      toast.success("Booking request sent successfully!");

      setName("");
      setEmail("");
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={css.bookingForm} onSubmit={handleSubmit}>
      <div className={css.inputsGroup}>
        <input
          className={css.bookingInput}
          type="text"
          name="name"
          placeholder="Name*"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className={css.bookingInput}
          type="email"
          name="email"
          placeholder="Email*"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button className={css.sendButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
