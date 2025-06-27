import { createUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await createUser(data.user);
  return NextResponse.json(user, {
    status: 201,
    statusText: "Created",
  });
}
