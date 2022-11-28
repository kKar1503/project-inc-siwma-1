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
import { CompanyEditForm, CompanyEditFormContext } from '../components/forms/companyEdit';

/**
 * Parses data retrieved from Supabase into a format accepted by the tables
 * @param {{}} data Data retrieved from Supabase
 * @returns {{id: number, image: string, name: string, website: string, bio: string}} Table-renderable data
 */
function parseData(data) {
  const parsedData = {
    ...data,
    image: data.image
      ? `https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/company-image-bucket/${data.image}`
      : null,
    comments: data.companies_comments[0],
  };

  // Remove the companies_comments key (The key comes from the query result because of inner joining)
  delete parsedData.companies_comments;

  return parsedData;
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
  if (!isLoading && queryData.data && queryData.data.length === 0) {
    // No company was retrieved
    // router.push('/companies');
  }

  // Retrieve query data
  const company = isLoading || !queryData.data ? false : parseData(queryData.data[0]);

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  useEffect(() => {
    // Redirect the user back to the company management page if an invalid companyid was specified
    if (!isLoading && !company) {
      // No company data retrieved
      // router.push('/companies');
    }
  });

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow shadow-xl rounded-2xl bg-base-100">
        {/* Body header */}
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">Edit {company ? company.name : 'company'}</h1>
          {/* If you want, you can use the company's name to replace 'company' in the heading below as well */}
          <h1>Edit company details manually below</h1>
        </div>

        {/* Form */}
        <CompanyEditFormContext
          onSuccessChange={() => {}}
          submitSuccess={false}
          defaultValues={company}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

EditCompany.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default EditCompany;
