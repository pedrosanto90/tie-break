import { createClient } from "@supabase/supabase-js";

// WARNING: CAN ONLY BE USED ON THE SERVER
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string,
);
