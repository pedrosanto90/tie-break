import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const supabase = createClient();

export async function createUser(data: User) {
  // Hashing password
  data.password = await bcrypt.hash(data.password, 10);
  const { data: user, error } = await supabase
    .from("users")
    .insert(data)
    .select("*");

  if (!user) throw error;

  return NextResponse.json(user, { status: 201, statusText: "Created" });
}
