import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  SESSION_SECRET: z.string().min(8).default("dev_session_secret_change_me"),
  DATABASE_URL: z.string().default("file:./dev.db"),
  FILE_STORAGE_DIR: z.string().default("uploads"),
  NODE_ENV: z.string().default("development"),
  ALLOWED_ORIGINS: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  API_VERSION: z.string().default("v1")
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    throw new Error(`Ungültige Umgebungsvariablen: ${issues}`);
  }
  return parsed.data;
}
