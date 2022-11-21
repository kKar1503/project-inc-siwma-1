import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ExistingCategories from '../components/Tables/ExistingCategories';
import CreateCategory from '../components/CreateCategory';

/**
 * Sample data
 */
const Categories = (id) => ({
  id,
  categoryname: 'GUANGZHAO METALWORKS, PTE. LTD',
  categorydescription: 'sallyknox_slfi@gmail.com',
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
    <NavBar />
    <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden pb-4 pt-4">
      <div className="card bg-base-100 w-full rounded-lg p-4">
        <CreateCategory />
      </div>
    </div>
    <div className="flex flex-row w-full gap-8 flex-1 justify-between xl:overflow-hidden">
      <ExistingCategories data={populateArray(Categories, 10)} />
    </div>
  </div>
);

/**
 * Use the layout for Admin Pages
 */
CategoryPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default CategoryPage;
