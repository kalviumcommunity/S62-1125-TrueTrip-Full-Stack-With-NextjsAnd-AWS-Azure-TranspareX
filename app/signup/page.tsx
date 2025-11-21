"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";

// Zod schema
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted:", data);
    // Simulate success
    alert(`Welcome, ${data.name}!`);
    reset();
  };

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Signup Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80 bg-gray-50 p-6 border rounded-lg"
        noValidate
      >
        <FormInput
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message as string | undefined}
          required
          placeholder="Your name"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message as string | undefined}
          required
          placeholder="you@example.com"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message as string | undefined}
          required
          placeholder="At least 6 characters"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
