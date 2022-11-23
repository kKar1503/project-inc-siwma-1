import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  `https://iecgehqhgqgpiejchgxu.supabase.co`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllY2dlaHFoZ3FncGllamNoZ3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4OTE1NTIsImV4cCI6MTk4MzQ2NzU1Mn0.2fQdXsv9iPZNLeiAaALP87s_tJZ83UalXyMpIOICymg`
);

export default supabase;
