import { z } from "zod";

const envSchema = z.object({
  APP_NAME: z.string().default("StayDesk"),
  APP_URL: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
  AUTH_SECRET: z.string().default("dev-auth-secret-staydesk-min32chars-key!"),
  ID_ENCRYPTION_KEY: z.string().default("dev-id-encryption-key-32bytes-secret!"),
  CRON_SECRET: z.string().default("dev-cron-secret"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse({
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  ID_ENCRYPTION_KEY: process.env.ID_ENCRYPTION_KEY,
  CRON_SECRET: process.env.CRON_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});
