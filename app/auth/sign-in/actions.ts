"use server";

import { auth, isAdminEmail } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function signInWithEmail(_prev: { error: string } | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  if (!isAdminEmail(email)) return { error: "This account does not have dashboard access." };

  const { error } = await auth.signIn.email({
    email,
    password: String(formData.get("password") || ""),
  });
  if (error) return { error: error.message || "Failed to sign in. Try again." };
  redirect("/admin");
}
