import { Log } from '@inc/utils';
import { createServiceSupabaseClient } from '@inc/utils/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import client from '../../../../../smtp/mailtrap';

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  //   if (req.method !== 'POST') {
  //     res.status(405).end();
  //     return;
  //   }

  const $inviteId = req.query.id;
  const inviteId = $inviteId instanceof Array ? $inviteId[0] : $inviteId;
  if (!inviteId) {
    res.status(400).end();
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
  //   if (appUser.permissions !== 1) {
  //     res.status(403).json({
  //       error: 'You do not have permission to perform this action',
  //     });
  //     return;
  //   }

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

  const { success } = await client.send({
    from: {
      email: 'acrylic125email@gmail.com',
      name: 'Acrylic125',
    },
    to: [
      {
        email: invite.email,
      },
    ],
    subject: 'Hello from Mailtrap',
    html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
          <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
          <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
          <p>Now send your email using our fake SMTP server and integration of your choice!</p>
          <p>Good luck! Hope it works.</p>
        </div>
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>
  `,
  });

  if (!success) {
    res.status(500).json({
      error: 'Failed to send invite',
    });
    return;
  }

  res.status(204).end();
}
