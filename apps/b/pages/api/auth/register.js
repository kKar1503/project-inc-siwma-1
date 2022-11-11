import { createServiceSupabaseClient } from '../../../utils';

/**
 *
 * This EP is used to register a new user.
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
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const serviceSupabase = createServiceSupabaseClient();

  const { data: createdUser, error: createUserError } = await serviceSupabase.auth.admin.createUser(
    {
      email: 'benedictjyss69@gmail.com',
      password: '12345678',
      user_metadata: {
        invite_token: token,
      },
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
