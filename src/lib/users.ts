import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function createUser(data: User) {
  const { data: user, error } = await supabase
    .from("users")
    .insert(data)
    .select("*");

  if (!user) throw error;

  return NextResponse.json(user, { status: 201, statusText: "Created" });
}
