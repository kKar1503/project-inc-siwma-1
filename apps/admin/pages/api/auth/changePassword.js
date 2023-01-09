import { SupabaseClient } from '@supabase/supabase-js';
import * as yup from 'yup';
import { createServiceSupabaseClient } from '@inc/utils';

const querySchema = yup.object().shape({
  userid: yup.string().required(),
});

const bodySchema = yup.object().shape({
  password: yup.string().required(),
});

async function changePassword(supabase, userid, newPassword) {
  const result = await supabase.auth.admin.updateUserById(userid, { password: newPassword });
  return result;
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const validatedQuery = await querySchema.validate(req.query);
  const { userid } = validatedQuery;

  const validatedBody = await bodySchema.validate(req.body);
  const { password } = validatedBody;

  const serviceSupabase = createServiceSupabaseClient();

  const { data, error } = changePassword(serviceSupabase, userid, password);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data) {
    return res.status(500).json({ error: 'Failed to change password' });
  }

  return res.status(200).json({ message: 'Password changed.' });
};

export default handler;