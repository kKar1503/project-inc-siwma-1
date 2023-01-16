import { Log } from '@inc/utils';
import { createServiceSupabaseClient } from '@inc/utils/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import sibClient from '../../../../../smtp/sib';

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      error: 'Method not allowed',
    });
    return;
  }

  const $inviteId = req.query.id;
  const inviteId = $inviteId instanceof Array ? $inviteId[0] : $inviteId;
  if (!inviteId) {
    res.status(400).json({
      error: 'Invite ID is required',
    });
    return;
  }

  const supabase = createServerSupabaseClient({
    req,
    res,
  });
  const { data: supabaseUser, error: supabaseUserError } = await supabase.auth.getUser();
  if (!supabaseUser || supabaseUserError) {
    res.status(401).json({
      error: 'You do not have permission to perform this action',
    });
    return;
  }
  const { data: appUser, error: appUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', supabaseUser.user.id)
    .single();
  if (!appUser || appUserError) {
    res.status(401).json({
      error: 'You do not have permission to perform this action',
    });
    return;
  }
  if (appUser.permissions !== 1) {
    res.status(403).json({
      error: 'You do not have permission to perform this action',
    });
    return;
  }

  const serviceSupabase = createServiceSupabaseClient();
  const { data: invite, error: inviteError } = await serviceSupabase
    .from('invite')
    .select('*')
    .eq('id', inviteId)
    .single();

  if (!invite || inviteError) {
    if (inviteError) {
      Log({}, inviteError);
    }
    res.status(404).json({
      error: `Invite with id ${inviteId} not found`,
    });
    return;
  }

  const apiInstance = new sibClient.TransactionalEmailsApi();
  let sendSmtpEmail = new sibClient.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    to: [
      {
        email: invite.email,
        name: invite.name,
      },
    ],
    sender: {
      email: process.env.SIB_SENDER_EMAIL,
      name: process.env.SIB_SENDER_NAME,
    },
    subject: 'SIWMA Invite',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <body>
        <h1>You have received an invite!</h1>
        <p>Click on the following link to create your account.</p>
        <a href="{{params.redirectUrl}}">Create Account</a>
      </body>
      </html>
      `,
    params: {
      redirectUrl: `http://localhost:3000/register?token=${invite.token}`,
    },
    headers: {
      // Do not forget to set your custom headers here
      'X-Mailin-custom': '',
    },
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({
      message: 'Invite EMail sent successfully.',
    });
  } catch (err) {
    Log({}, err);
    res.status(500).json({
      error: 'Something went wrong when sending the invite EMail.',
    });
  }
}
