"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Sign in</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email) return;
          await signIn("email", { email, redirect: true, callbackUrl: "/" });
        }}
        className="space-y-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send magic link
        </button>
      </form>
    </main>
  );
}
