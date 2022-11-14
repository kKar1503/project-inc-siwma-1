import Head from 'next/head';
import PropTypes from 'prop-types';
import Sidebar, { adminSidebar } from '../Sidebar/Sidebar';

const AdminPageLayout = ({ children, pageName }) => (
  <div className="bg-[#FAFAFA]">
    <Head>
      <title>Team B</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Sidebar sidebarList={adminSidebar} selected={pageName}>
      {children}
    </Sidebar>
  </div>
);

AdminPageLayout.propTypes = {
  children: PropTypes.node,
  pageName: PropTypes.string,
};

export default AdminPageLayout;