import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { userId, newRole } = await req.json();
  if (!["admin", "user"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  // Prevent self-demotion
  if (session.user.id === userId && newRole !== "admin") {
    return NextResponse.json({ error: "Cannot demote yourself from admin." }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { role: newRole } }
  );
  return NextResponse.json({ success: true, role: newRole });
} 