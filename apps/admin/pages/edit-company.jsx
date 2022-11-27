import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getCompany } from '@inc/database';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ToggleEdit from '../components/FormControl/ToggleEdit';
import ToggleEditArea from '../components/FormControl/ToggleEditArea';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, profilePicture: Object, company: string, website: string, bio: string, isSelected: boolean}} Table-renderable data
 */
function parseData(data) {
  return {
    ...data,
    image: `https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/${
      data.image || 'example.jpg'
    }`,
  };
}

const EditCompany = () => {
  // Retrieve company id from query param
  const router = useRouter();
  const { companyid } = router.query;

  // -- Queries Supabase --//
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Retrieve company data
  const {
    data: queryData,
    isLoading,
    isError,
  } = useQuery({
    // Fetches companies from supabase
    queryKey: ['getCompany', { id: companyid }],
    keepPreviousData: true,
    refetchInterval: 60000, // Refresh every minute
    queryFn: async () =>
      getCompany({
        supabase,
        companyid,
        getAdminComment: true,
      }),
  });

  // -- Prepare fetched data for rendering & processing -- //
  // Redirect the user if no company was retrieved
  if (!isLoading && queryData.data.length === 0) {
    // No company was retrieved
    router.push('/companies');
  }

  // Retrieve query data
  const company = isLoading || !queryData.data ? {} : parseData(queryData.data[0]);

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  useEffect(() => {
    // Redirect the user back to the company management page if an invalid companyid was specified
    if (!isLoading && !company) {
      // No company data retrieved
      router.push('/companies');
    }
  });

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow h-fit shadow-xl rounded-2xl bg-base-100">
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">Edit {company ? company.name : 'company'}</h1>
          {/* If you want, you can use the company's name to replace 'company' in the heading below as well */}
          <h1>Edit company details manually below</h1>
        </div>
        <div className="flex flex-wrap gap-8 p-8">
          <div className="flex flex-col flex-[3] flex-wrap">
            <div className="flex flex-col justify-center items-center">
              <div className="avatar aspect-square w-64 rounded-full bg-none items-center justify-center group">
                <Image
                  src={company ? company.image : ''}
                  alt="profile"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <input
                  id="fileInput"
                  type="file"
                  onChange={changeHandler}
                  className="hidden"
                  accept=".png, .jpg, .jpeg"
                />
                <label
                  htmlFor="fileInput"
                  className="btn btn-ghost w-full h-full rounded-full items-center hidden justify-center group-hover:flex"
                >
                  <span>UPLOAD IMAGE</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex-[9] flex-wrap">
            <div className="flex flex-col w-full min-w-96 gap-12">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEdit value={company ? company.name : 'company'} label="Company Name" />
                  <ToggleEdit
                    value={company ? company.website : 'company website'}
                    label="Website"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEditArea
                    value={company ? company.bio : 'company bio'}
                    label="Company Bio"
                    maxLength={255}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <ToggleEditArea
                    value={company ? company.comments : 'company comments'}
                    label="Comments"
                    maxLength={255}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-8 pb-8 justify-end">
          <a href="./companies" className="btn btn-primary">
            Return To Companies
          </a>
        </div>
      </div>
    </div>
  );
};

EditCompany.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default EditCompany;
