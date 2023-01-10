import React, { createContext } from 'react';

/**
 * @type {React.Context<{
 *  isLoading: boolean;
 *  isAuthenticated: boolean;
 *  supabaseUser: import('@supabase/supabase-js').User | null;
 *  appUser: {
 *      id: string;
 *      email: string;
 *      fullname: string;
 *      created_at: string;
 *      updated_at: string;
 *      phone: string;
 *      contact: number;
 *      bio?: string;
 *      companyId?: number;
 *      permissions: number;
 *      enabled: boolean;
 *      image?: string;
 *  } | null
 * }>}
 */
const AppUserContext = createContext({
  supabaseUser: null,
  appUser: null,
  isLoading: false,
  isAuthenticated: false,
});

export default AppUserContext;
