import { z } from 'zod';

// ----- Auth -----
export const LoginSchema = z.object({
  email: z.string().email('Must be a valid email address').max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

export const SignupSchema = z.object({
  email: z.string().email('Must be a valid email address').max(254),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
});

// ----- Profile -----
export const UpdateProfileSchema = z.object({
  full_name:    z.string().min(2).max(100).trim(),
  bio:          z.string().max(500).trim().optional(),
  neighborhood: z.string().max(100).trim().optional(),
  interests:    z.array(z.string().max(50)).max(10).optional(),
});

// ----- Intention -----
export const CreateIntentionSchema = z.object({
  event_id:         z.string().uuid(),
  message:          z.string().min(1, 'Message is required').max(280).trim(),
  experience_level: z.enum(['beginner', 'casual', 'experienced']),
});

// ----- Message -----
export const SendMessageSchema = z.object({
  receiver_id: z.string().uuid(),
  event_id:    z.string().uuid(),
  content:     z.string().min(1).max(1000).trim(),
});

export type LoginInput            = z.infer<typeof LoginSchema>;
export type SignupInput            = z.infer<typeof SignupSchema>;
export type UpdateProfileInput    = z.infer<typeof UpdateProfileSchema>;
export type CreateIntentionInput  = z.infer<typeof CreateIntentionSchema>;
export type SendMessageInput      = z.infer<typeof SendMessageSchema>;
