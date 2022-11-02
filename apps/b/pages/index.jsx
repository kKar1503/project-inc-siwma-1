import AdminFigure from '../components/AdminFigure';
import AdminPageLayout from '../components/layouts/AdminPageLayout';

const Home = () => (
  <div className="flex flex-row flex-wrap w-full h-full gap-8 p-8">
    <AdminFigure title="Registered Companies" value="1,234" color="text-primary" />
    <AdminFigure title="Total Users" value="4,568" color="text-accent" />
    <AdminFigure title="Pending Invites" value="5,983" color="text-secondary" />
  </div>
);

/**
 * Use the layout for Admin Pages
 */
Home.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;

export default Home;
