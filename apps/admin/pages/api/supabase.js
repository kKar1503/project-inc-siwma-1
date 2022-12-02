import { createClient } from '@supabase/supabase-js';

// Configure supabase client options
const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

// Load env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create supabase client
const supabase = createClient(supabaseUrl, supabaseKey, options);

export default supabase;
