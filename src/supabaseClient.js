import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://TAVO-PROJEKTO-ID.supabase.co";
const supabaseAnonKey = "sb_publishable_TAVO_RAKTAS";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);