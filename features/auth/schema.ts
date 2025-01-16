import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Required").trim(),
  email: z.string().email(),
  password: z.string().min(8, "Password should be at least 8 characters long."),
});