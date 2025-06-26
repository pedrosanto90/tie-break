import { User } from "@/types/user";
import { supabase } from "./supabase";

export async function insertData(data: User) {
  //Insert data into public.users table
  const { data: _user } = await supabase
    .from("users")
    .insert({
      email: data.email,
      full_name: data.full_name,
      birthdate: data.birthdate,
      gender: data.gender,
      role: data.role,
      user_id: data.id,
    })
    .select("*");
  return _user;
}

export async function createUser(data: User) {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email as string,
    password: data.password as string,
  });

  if (error) {
    console.error("Error during user sign up:", error.message);
    throw error;
  }

  const user = authData?.user;
  if (!user || !user.id || !user.email) {
    console.error("Sign up failed, user object is null or missing fields.");
    throw new Error("User signup failed or returned incomplete data.");
  }

  if (error) throw error;
  return authData;
}

// Need to see this better to use supabase auth
export async function login(data: User) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*, roles(role)")
    .eq("email", data.email);
  if (error) {
    return JSON.stringify({ error: "User not found" });
  }
  return user;
}

export default async function getUsers() {
  const { data: users, error } = await supabase.from("users").select();
  if (error) throw error;
  return users;
}
