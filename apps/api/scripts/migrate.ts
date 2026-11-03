import { readdir, readFile } from "node:fs/promises";
import { pool } from "../src/db.ts";

const dir = new URL("../migrations/", import.meta.url);
const LOCK_ID = 727274; // any fixed number; stops two runs at once

const client = await pool.connect();
try {
  await client.query("SELECT pg_advisory_lock($1)", [LOCK_ID]);
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )`);

  const { rows } = await client.query<{ version: string }>(
    "SELECT version FROM schema_migrations",
  );
  const applied = new Set(rows.map((row) => row.version));
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(new URL(file, dir), "utf8");
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (version) VALUES ($1)",
        [file],
      );
      await client.query("COMMIT");
      console.log(`applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(`failed ${file}`);
      throw error;
    }
  }
  console.log("migrations up to date");
} finally {
  await client
    .query("SELECT pg_advisory_unlock($1)", [LOCK_ID])
    .catch(() => {});
  client.release();
  await pool.end();
}
