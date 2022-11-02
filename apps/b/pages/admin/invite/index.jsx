import FileUpload from '../../../components/FileUpload';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';
import NavBar from '../../../components/NavBar';

// eslint-disable-next-line react/prop-types
const TestTable = ({ className }) => (
  <div className={className}>
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const InvitesPage = () => (
  <div className="flex flex-col flex-1 w-full p-8 gap-8 overflow-auto">
    <NavBar />
    <div className="flex flex-col lg:grid lg:grid-flow-row grid-cols-12 gap-8 flex-1">
      <FileUpload className="h-full col-span-4" />
      <div className="flex flex-col col-start-5 col-end-13 gap-8 flex-1 justify-between">
        <TestTable className="shadow-lg flex-1" />
        <TestTable className="shadow-lg flex-1" />
        <div className="flex justify-end">
          <button className="btn btn-primary rounded-lg btn-wide">Confirm</button>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Use the layout for Admin Pages
 */
InvitesPage.getLayout = (page) => <AdminPageLayout pageName="Invites">{page}</AdminPageLayout>;

export default InvitesPage;
