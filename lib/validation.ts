import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(5000),
});

export const guestAuthSchema = z.object({
  username: z.string().min(2).max(50).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email().max(255).optional(),
});

export const scoreSubmissionSchema = z.object({
  wpm: z.number().min(0).max(500),
  accuracy: z.number().min(0).max(100),
  timeSeconds: z.number().int().min(1).max(3600),
  totalCharacters: z.number().int().min(1),
  correctCharacters: z.number().int().min(0),
  incorrectCharacters: z.number().int().min(0),
});