import { useMemo, useState } from 'react';
import { useQueries, useQueryClient } from 'react-query';
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
  console.log(data);
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
  const { query } = useRouter();

  const queryClient = useQueryClient();

  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const [getUserInfoQuery, getCompaniesQuery, getCommentQuery] = useQueries([
    {
      queryKey: ['getUserInfo'],
      queryFn: async () =>
        supabase.from('users').select(`*, companies:companyid(name)`).eq('id', query.userid),
    },
    {
      queryKey: ['getCompanies'],
      queryFn: async () => supabase.from('companies').select('*'),
    },
    {
      queryKey: ['getComment'],
      queryFn: async () => supabase.from('users_comments').select('*').eq('id', query.userid),
    },
  ]);

  const user =
    getUserInfoQuery.isLoading || !getUserInfoQuery.data
      ? {}
      : parseUserData(getUserInfoQuery.data.data[0]);

  const companies = getCompaniesQuery.isLoading
    ? []
    : parseCompanyData(getCompaniesQuery.data.data);

  const comment =
    getCommentQuery.isLoading || !getCommentQuery.data
      ? {}
      : parseCommentData(getCommentQuery.data.data);

  const profilePic =
    'https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/example.jpg';

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useMemo(() => {
    console.log(selectedFile);
    // ADD API CALL HERE (UPDATES FIELD TO DB AND UPDATES PROFILE PIC)
  }, [selectedFile]);

  return (
    <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow h-fit shadow-xl rounded-2xl space-between bg-base-100">
        <div className="flex flex-col px-6 pt-6">
          <h1 className="font-bold text-xl">Edit User</h1>
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
                  <ToggleSelect
                    value={user ? user.company : ''}
                    options={companies}
                    label="Company"
                  />
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
  );
};

EditUser.getLayout = (page) => <AdminPageLayout pageName="Users">{page}</AdminPageLayout>;

export default EditUser;
