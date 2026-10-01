import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

// Load .env.local without extra dependencies
try {
  for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS inquiries (
    id                BIGSERIAL PRIMARY KEY,
    reference_id      TEXT UNIQUE NOT NULL,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    name              TEXT NOT NULL,
    email             TEXT NOT NULL,
    phone             TEXT,
    organization      TEXT NOT NULL,
    org_type          TEXT,
    service           TEXT NOT NULL,
    timeline          TEXT,
    project_scope     TEXT,
    confirmation_sent BOOLEAN NOT NULL DEFAULT false,
    notification_sent BOOLEAN NOT NULL DEFAULT false
  )`;
await sql`CREATE INDEX IF NOT EXISTS inquiries_created_idx ON inquiries (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (lower(email), created_at DESC)`;
console.log("inquiries table ready");
