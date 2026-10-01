import AuthForm from "../AuthForm";
import { signUpWithEmail } from "./actions";

export const metadata = { title: "Create account | PUL Consulting", robots: { index: false } };

export default function Page() {
  return <AuthForm mode="sign-up" action={signUpWithEmail} />;
}
