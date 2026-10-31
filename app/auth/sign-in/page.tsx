import AuthForm from "../AuthForm";
import { signInWithEmail } from "./actions";

export const metadata = { title: "Admin Sign In", alternates: { canonical: "/auth/sign-in" }, robots: { index: false, follow: false } };

export default function Page() {
  return <AuthForm mode="sign-in" action={signInWithEmail} />;
}
