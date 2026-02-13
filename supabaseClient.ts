import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE KEY exists:", Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY));
console.log("SUPABASE KEY prefix:", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 15));

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

