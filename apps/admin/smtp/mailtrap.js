import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({ token: TOKEN });
export default client;
