"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { createBookingRequest } from "@/lib/api";
import css from "./BookingForm.module.css";
import { FiAlertCircle } from "react-icons/fi";

interface BookingFormProps {
  camperId: string;
}

type BookingFormValues = {
  name: string;
  email: string;
};

type FormErrors = Partial<Record<keyof BookingFormValues, string>>;

const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required.")
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}(?:[\s'-]+[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,})+$/,
      "Please enter your full name.",
    ),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default function BookingForm({ camperId }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const validatedValues = await bookingSchema.validate(values, {
        abortEarly: false,
      });

      setErrors({});
      setIsSubmitting(true);

      await createBookingRequest(camperId, {
        name: validatedValues.name.trim(),
        email: validatedValues.email.trim(),
      });

      toast.success("Booking request sent successfully!");

      setValues({
        name: "",
        email: "",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};

        error.inner.forEach((validationError) => {
          const fieldName = validationError.path as keyof BookingFormValues;

          if (fieldName) {
            validationErrors[fieldName] = validationError.message;
          }
        });

        setErrors(validationErrors);
        toast.error("Please check the form fields.");
        return;
      }

      console.error("Failed to create booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={css.bookingForm} onSubmit={handleSubmit} noValidate>
      <div className={css.inputsGroup}>
        <label className={css.field}>
          <div className={css.inputWrapper}>
            {errors.name && <span className={css.floatingLabel}>Name*</span>}

            <input
              className={`${css.bookingInput} ${errors.name ? css.inputError : ""}`}
              type="text"
              name="name"
              placeholder={errors.name ? "" : "Name*"}
              value={values.name}
              onChange={handleChange}
            />

            {errors.name && <FiAlertCircle className={css.errorIcon} />}
          </div>

          {errors.name && <p className={css.errorText}>{errors.name}</p>}
        </label>

        <label className={css.field}>
          <div className={css.inputWrapper}>
            {errors.email && <span className={css.floatingLabel}>Email*</span>}

            <input
              className={`${css.bookingInput} ${errors.email ? css.inputError : ""}`}
              type="email"
              name="email"
              placeholder={errors.email ? "" : "Email*"}
              value={values.email}
              onChange={handleChange}
            />

            {errors.email && <FiAlertCircle className={css.errorIcon} />}
          </div>

          {errors.email && <p className={css.errorText}>{errors.email}</p>}
        </label>
      </div>

      <button className={css.sendButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
