import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  `https://rvndpcxlgtqfvrxhahnm.supabase.co`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bmRwY3hsZ3RxZnZyeGhhaG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4NDkyMTEsImV4cCI6MTk4NDQyNTIxMX0.Yq0u16J0hWK3eeKPDyeVX86peOkWy7JJtOEbsmN4tF8`
);

export default supabase;
