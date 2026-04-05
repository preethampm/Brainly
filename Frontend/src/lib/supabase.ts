import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xkwxomurvpqchybvmugm.supabase.co";
const supabaseKey = "sb_publishable_QnnnR55JfY4oVVUKHg12OA_2Y3MGmo6";

export const supabase = createClient(supabaseUrl, supabaseKey);