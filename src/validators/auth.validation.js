// validation schemas for authentication

const { z } = require("zod");

const registerSchema = z.object({
 body:z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),

  email: z.string().trim().email("Please enter a valid email address"),

  password: z.string().min(6, "Password must be at least 6 characters long"),

  adminKey: z.string().optional(),
 })
});

const loginSchema = z.object({
   body:z.object({
    email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
   })
});

module.exports = { registerSchema, loginSchema };
