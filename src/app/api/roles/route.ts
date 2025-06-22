import getRoles from "@/lib/roles";
import { NextResponse } from "next/server";

export async function GET() {
  const roles = await getRoles();
  return NextResponse.json(roles, {
    status: 200,
  });
}
