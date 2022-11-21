import ArrowL from '../components/ArrowL';
import ArrowR from '../components/ArrowR';
import CreateParam from '../components/CreateParam';
import EditCat from '../components/EditCat';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ActiveParametersTable from '../components/Tables/ActiveParametersTable';
import AvailableParametersTable from '../components/Tables/AvailableParametersTable';

/**
 * Sample data
 */
const ActiveParametersData = (id) => ({
  id,
  company: 'GUANGZHAO METALWORKS, PTE. LTD',
  email: 'sallyknox_slfi@gmail.com',
  mobileNumber: '+65 9832 0293',
});

const AvailableParametersData = (id) => ({
  id,
  company: 'GUANGZHAO METALWORKS, PTE. LTD',
  website: 'www.guangzhaomw.com',
});

function populateArray(element, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result[i] = element(i + 1);
  }

  return result;
}

const CategoryPage = () => (
  <div className="w-full p-8 gap-8 overflow-auto xl:max-h-screen">
    {/* <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto xl:max-h-screen"> */}
    <NavBar />
    <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
      <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
        <EditCat />
      </div>
      <div className="card bg-base-100 shadow-lg w-full rounded-lg p-4">
        <CreateParam />
      </div>
    </div>
    <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden items-center">
      <ActiveParametersTable data={populateArray(ActiveParametersData, 10)} />
      <div className="flex flex-col">
        <ArrowR />
        <br />
        <ArrowL />
      </div>

      <AvailableParametersTable data={populateArray(AvailableParametersData, 10)} />
    </div>
  </div>
);

/**
 * Use the layout for Admin Pages
 */
CategoryPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default CategoryPage;
