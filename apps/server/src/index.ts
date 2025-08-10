import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import { loadEnv } from "./config/env";
import { contentRoutes } from "./routes/content";
import { boardRoutes } from "./routes/board";

async function buildServer() {
  const env = loadEnv();

  const app = Fastify({
    logger: {
      level: "info"
    }
  });

  // Plugins - Dynamic CORS for development and production
  const allowedOrigins = env.NODE_ENV === 'production' 
    ? env.ALLOWED_ORIGINS?.split(',') || ['https://motioncontent.at', 'https://www.motioncontent.at']
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

  await app.register(cors, {
    origin: allowedOrigins,
    credentials: true
  });
  await app.register(cookie, {
    hook: "onRequest"
  });
  await app.register(multipart);

  // Register routes
  await app.register(contentRoutes);
  await app.register(boardRoutes);

  // Health + Info
  app.get("/api/health", async () => {
    return { status: "ok", zeit: new Date().toISOString() };
  });

  app.get("/api", async () => {
    return {
      name: "Content Collab API",
      sprache: "de",
      version: "0.1.0",
      hinweis: "MVP – Uploads, Planung, Kommentare folgen schrittweise."
    };
  });

  // Not found handler (Deutsch)
  app.setNotFoundHandler((_req, reply) => {
    reply.status(404).send({ fehler: "Ressource nicht gefunden" });
  });

  // Error handler (Deutsch)
  app.setErrorHandler((err, _req, reply) => {
    app.log.error(err);
    reply.status(500).send({ fehler: "Interner Serverfehler" });
  });

  // Start
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info(`API läuft auf http://localhost:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

buildServer();
