import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_URL, process.env.NEXT_PUBLIC_KEY);

export default supabase;
