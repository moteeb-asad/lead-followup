import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

export const pool = new pg.Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30_000, // close connections idle for 30s
  connectionTimeoutMillis: 5_000, // fail after 5s instead of waiting forever
});

// An idle connection can drop (Postgres restart, network blip).
// Without this listener, that error crashes the whole API.
pool.on("error", (error) => {
  console.error("Idle database client error:", error.message);
});
