import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!client) client = neon(process.env.DATABASE_URL);
  return client;
}

export interface InquiryRow {
  id: number;
  reference_id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string;
  org_type: string | null;
  service: string;
  timeline: string | null;
  project_scope: string | null;
  confirmation_sent: boolean;
  notification_sent: boolean;
}
