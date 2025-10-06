import { db } from "@/db";
import { randomUUID } from "crypto";
import { users } from "@/db/auth-schema";

export async function POST() {
  const id = randomUUID();
  const email = `test+${id.slice(0,8)}@example.com`;
  await db.insert(users).values({ id, email });
  return Response.json({ created: { id, email } }, { status: 201 });
}

export async function GET() {
  const rows = await db.select().from(users).limit(5);
  return Response.json({ users: rows });
}
