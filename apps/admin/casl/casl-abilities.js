import { AbilityBuilder, defineAbility } from '@casl/ability';

/**
 *
 * @param {{
 *  supabaseUser: import('@supabase/supabase-js').User;
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
 *  }}} options
 * @returns
 */
export default function defineUserAbilitiesFor({ supabaseUser, appUser }) {
  //   const { can, cannot, rules, build } = new AbilityBuilder();

  //   can('View', 'Users');
  //   can('View', 'Companies');

  //   return build({});
  return defineAbility((can, cannot) => {
    if (supabaseUser) {
      can('View', 'Users');
      can('View', 'Companies');
    }
  });
}
