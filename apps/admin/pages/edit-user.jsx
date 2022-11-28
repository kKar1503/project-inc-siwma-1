import { useMemo, useState } from 'react';
import { QueryClientProvider, useQueries, QueryClient } from 'react-query';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ToggleEdit from '../components/FormControl/ToggleEdit';
import ToggleEditArea from '../components/FormControl/ToggleEditArea';
import TogglePass from '../components/FormControl/TogglePass';
import ToggleSelect from '../components/FormControl/ToggleSelect';
import supabase from './api/supabase';

function parseUserData(data) {
  return {
    ...data,
  };
}

function parseCompanyData(data) {
  const result = [];
  data.map((e) => result.push(e.name));
  return result;
}

function parseCommentData(data) {
  return {
    ...data,
  };
}

const EditUser = () => {
  const router = useRouter();
  const { userid } = router.query;

  console.log(userid);

  const queryClient = new QueryClient();

  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const queries = useQueries([
    {
      queryKey: ['getUser', userid],
      queryFn: async () => supabase.from('users').select('*').eq('id', userid),
      keepPreviousData: true,
    },
    {
      queryKey: ['getCompanies'],
      queryFn: async () => supabase.from('companies').select('*'),
      keepPreviousData: true,
    },
    {
      queryKey: ['getComment', userid],
      queryFn: async () => supabase.from('users_comments').select('*').eq('userid', userid),
      keepPreviousData: true,
    },
  ]);

  const isLoading = queries.some((e) => e.isLoading);

  const [getUserQuery, getCompaniesQuery, getCommentQuery] = queries;

  const user = isLoading || !getUserQuery.data.data ? {} : parseUserData(getUserQuery.data.data[0]);

  // console.log(user);

  const companies =
    isLoading || !getCompaniesQuery.data.data ? [] : parseCompanyData(getCompaniesQuery.data.data);

  const comment =
    isLoading || !getCommentQuery.data.data ? {} : parseCommentData(getCommentQuery.data.data[0]);

  const profilePic =
    'https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg';

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useMemo(() => {
    // console.log(selectedFile);
    // ADD API CALL HERE (UPDATES FIELD TO DB AND UPDATES PROFILE PIC)
  }, [selectedFile]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
        <NavBar />

        <div className="flex flex-col grow h-fit shadow-xl rounded-2xl bg-base-100">
          <div className="flex flex-col p-8 border-b">
            <h1 className="font-bold text-xl">Edit User</h1>
            {/* If you want, you can use the user's name to replace 'user' in the heading below as well */}
            <h1>Edit user details manually below</h1>
          </div>
          <div className="flex flex-wrap gap-8 p-8">
            <div className="flex flex-col flex-[3] flex-wrap">
              <div className="flex flex-col justify-center items-center">
                <div className="avatar aspect-square w-64 rounded-full bg-none items-center justify-center group">
                  <Image
                    src={profilePic}
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
                    <ToggleSelect value="Softmicro" options={companies} label="Company" />
                    <ToggleEdit value={user ? user.fullname : ''} label="Full Name" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <ToggleEdit value={user ? user.email : ''} label="E-mail" />
                    <ToggleEdit value={user ? user.phone : ''} label="Mobile Number" />
                  </div>
                  <TogglePass />
                  <div className="flex flex-col gap-4">
                    <ToggleEditArea
                      value={comment ? comment.comments : 'Write here...'}
                      label="Comments"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-8 pb-8 justify-end">
            <a href="./users" className="btn btn-primary">
              Return To Users
            </a>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

EditUser.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

export default EditUser;
