import AuthForm from "../AuthForm";
import { signInWithEmail } from "./actions";

export const metadata = { title: "Sign in | PUL Consulting", robots: { index: false } };

export default function Page() {
  return <AuthForm mode="sign-in" action={signInWithEmail} />;
}
