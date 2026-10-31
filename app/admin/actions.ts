"use server";

import { redirect } from "next/navigation";
import { authConfigured, getAuth } from "@/lib/auth/server";

export async function signOut() {
  if (authConfigured()) await getAuth().signOut();
  redirect("/auth/sign-in");
}
