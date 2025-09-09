"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Sign In</h1>
      <button
        onClick={() => signIn("email", { email: "gasteren@gmail.com" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send Magic Link
      </button>
    </main>
  );
}
