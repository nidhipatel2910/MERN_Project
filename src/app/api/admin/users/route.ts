import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("API session:", session); // Debug session object
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const client = await clientPromise;
  const db = client.db();
  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();
  return NextResponse.json({ users });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
  return NextResponse.json({ success: true });
} 