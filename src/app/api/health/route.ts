import { db } from "@/db/client";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await db.select({ id: users.id }).from(users).limit(1);
    return NextResponse.json({ ok: true, usersSeen: result.length });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
