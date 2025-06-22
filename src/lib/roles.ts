import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default async function getRoles() {
  const { data: roles, error } = await supabase.from("roles").select();
  if (error) throw error;
  return roles;
}
