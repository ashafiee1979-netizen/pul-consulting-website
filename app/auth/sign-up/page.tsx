import AuthForm from "../AuthForm";
import { signUpWithEmail } from "./actions";

export const metadata = { title: "Create Admin Account", alternates: { canonical: "/auth/sign-up" }, robots: { index: false, follow: false } };

export default function Page() {
  return <AuthForm mode="sign-up" action={signUpWithEmail} />;
}
