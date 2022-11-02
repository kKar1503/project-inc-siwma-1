import AdminPageLayout from '../../../components/layouts/AdminPageLayout';

const InvitesPage = () => <button className="btn btn-primary">Hello</button>;

/**
 * Use the layout for Admin Pages
 */
InvitesPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default InvitesPage;
