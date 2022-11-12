import { SupabaseClient } from '@supabase/supabase-js';
import * as yup from 'yup';
import { createServiceSupabaseClient } from '../../../utils';

const bodySchema = yup.object().shape({
  fullname: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
});

/**
 * TODO: Move this out to a separate file.
 * @param {SupabaseClient} supabase
 * @param {string} token
 */
async function getInviteByToken(supabase, token) {
  const result = await supabase
    .from('invite')
    .select('*')
    // .eq('token', token)
    // TODO: Resolve by token.
    .eq('id', 3)
    .maybeSingle();
  return result;
}

/**
 *
 * This EP is used to:
 * POST: Register a new user for the given token.
 *
 * Why is this an EP?
 * Creation of a user is done through the supabase admin API which requires
 * a service key. Thus, this MUST run on the server side.
 *
 * EP: POST /api/auth/register?token=<invite_token>
 *
 * @type {import("next").NextApiHandler}
 */
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the invite token from the query string.
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  // Extract body.
  const validatedBody = await bodySchema.validate(req.body);
  const { fullname, password, phone } = validatedBody;

  // TODO: Use yup or zod to validate the body.

  // Prepare the supabase client.
  const serviceSupabase = createServiceSupabaseClient();

  // First we resolve the invite.
  const { data: invite, error: inviteError } = await getInviteByToken(serviceSupabase, token);
  if (inviteError) {
    // TODO: Use a proper logging library to log the error.
    // eslint-disable-next-line no-console
    console.error(inviteError);
    return res.status(400).json({ error: inviteError.message });
  }
  if (!invite) {
    return res.status(400).json({ error: 'Invite not found' });
  }

  // Then we create the user.
  const { data: createdUser, error: createUserError } = await serviceSupabase.auth.admin.createUser(
    {
      email: invite.email,
      password,
      user_metadata: {
        // Initial data will be used to populate the user's profile within
        // the trigger that creates the ums.user record.
        initial_data: {
          fullname,
          companyid: invite.company,
        },
      },
      phone,
      email_confirm: true,
    }
  );
  if (createUserError) {
    // TODO: Use a proper logging library to log the error.
    // eslint-disable-next-line no-console
    console.error(createUserError);
    return res.status(500).json({ error: 'Failed to create user' });
  }
  if (!createdUser) {
    return res.status(500).json({ error: 'Failed to create user' });
  }

  return res.status(200).json({ createdUser });
};

export default handler;
