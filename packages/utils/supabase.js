// Disable prefer default export for now. Interface with index.js to prevent any issues
// when refactoring.
/* eslint-disable import/prefer-default-export */

import { createClient } from '@supabase/supabase-js';

/**
 *
 * DO NOT USE THIS IN THE CLIENT SIDE. THIS IS ONLY FOR SERVER SIDE USE.
 *
 * This function creates a service client that bypasses RLS.
 */
export function createServiceSupabaseClient() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
    {
      db: {},
    }
  );
  return supabase;
}
