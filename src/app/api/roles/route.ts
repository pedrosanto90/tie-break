import getRoles from "@/lib/roles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const roles = await getRoles();
  return NextResponse.json(roles, {
    status: 200,
  });
}
