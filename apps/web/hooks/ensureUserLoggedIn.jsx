import {useSupabaseClient} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const EnsureUserLoggedIn = () => {
  const client = useSupabaseClient();
  const router = useRouter();
  client.auth.getSession().then((session) => {
    const loggedIn = session.data.session !== null;
    if (loggedIn) return;
    router.push('/login');
  });
}

export default EnsureUserLoggedIn;
