"use server";

import { auth, isAdminEmail } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function signUpWithEmail(_prev: { error: string } | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  // Only allow-listed addresses may register; everyone else is refused.
  if (!isAdminEmail(email)) return { error: "Registration is restricted to PUL Consulting administrators." };

  const { error } = await auth.signUp.email({
    email,
    name: String(formData.get("name") || ""),
    password: String(formData.get("password") || ""),
  });
  if (error) return { error: error.message || "Failed to create account." };
  redirect("/admin");
}
