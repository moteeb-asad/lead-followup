import { createApp } from "./app.ts";
import { pool } from "./db.ts";

const port = Number(process.env.PORT ?? 4000);

const server = createApp().listen(port, () => {
  console.info(`API listening on http://localhost:${port}`);
});

// Ctrl+C or a deploy stops the API in order: stop taking new requests, let the
// running ones finish, then close the database connections.
// https://node-postgres.com/apis/pool (pool.end)
function shutdown(signal: string) {
  console.info(`${signal} received, shutting down`);

  // A stuck request shouldn't keep the process alive forever.
  setTimeout(() => process.exit(1), 10_000).unref();

  server.close(async () => {
    try {
      await pool.end();
      process.exit(0);
    } catch (error) {
      console.error(
        "Closing the database pool failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
      process.exit(1);
    }
  });
}

// `once`: a second Ctrl+C isn't handled, so it stops the process right away.
process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
