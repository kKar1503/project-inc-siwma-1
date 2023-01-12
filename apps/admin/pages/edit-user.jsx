import { useMemo, useState } from 'react';
import { QueryClientProvider, useQueries, QueryClient, useMutation } from 'react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ToggleEdit from '../components/FormControl/ToggleEdit';
import ToggleEditArea from '../components/FormControl/ToggleEditArea';
import TogglePass from '../components/FormControl/TogglePass';
import ToggleSelect from '../components/FormControl/ToggleSelect';

function parseUserData(data) {
  return {
    ...data,
    company: data === undefined ? '' : data.companies.name,
  };
}

function parseCompanyData(data) {
  const result = [];
  // eslint-disable-next-line array-callback-return
  data.map((e) => {
    result.push({ id: e.id, name: e.name });
  });
  return result;
}

function parseCommentData(data) {
  return {
    ...data,
  };
}

const EditUser = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { userid } = router.query;

  const queryClient = new QueryClient();

  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const queries = useQueries([
    {
      queryKey: ['getUser', userid],
      queryFn: async () =>
        supabase.from('users').select(`*, companies:companyid(name)`).eq('id', userid),
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

  const companies =
    isLoading || !getCompaniesQuery.data.data ? [] : parseCompanyData(getCompaniesQuery.data.data);

  const commentData =
    isLoading || !getCommentQuery.data.data ? {} : parseCommentData(getCommentQuery.data.data[0]);

  const profilePic = `${process.env.NEXT_PUBLIC_COMPANY_BUCKET_URL}example.jpg`;

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useMemo(() => {
    // console.log(selectedFile);
    // ADD API CALL HERE (UPDATES FIELD TO DB AND UPDATES PROFILE PIC)
  }, [selectedFile]);

  const [fullname, setFullname] = useState(user ? user.fullname : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [company, setCompany] = useState(user ? user.companyid : 0);
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [newPassword, setNewPassword] = useState('');
  const [comment, setComment] = useState(
    commentData && !commentData === {} ? commentData.comments : ''
  );

  function parseUpdateData() {
    const updateData = {};
    if (fullname !== '') updateData.fullname = fullname;
    if (email !== '') updateData.email = email;
    if (company !== '') updateData.companyid = company;
    if (phone !== '') updateData.phone = phone;
    return updateData;
  }

  const { mutate: editUser, isError: userError } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async () => supabase.from('users').update(parseUpdateData()).eq('id', user.id),
  });

  const { mutate: editComment, isError: commentUpdatError } = useMutation({
    mutationKey: ['updateComment'],
    mutationFn: async () =>
      supabase.from('users_comments').update({ comments: comment }).eq('userid', user.id),
  });

  const { mutate: addComment, isError: commentInsertError } = useMutation({
    mutationKey: ['insertComment'],
    mutationFn: async () =>
      supabase.from('users_comments').insert({ userid: user.id, comments: comment }),
  });

  const { mutate: sendPasswordEmail, isError: passwordEmailError } = useMutation({
    mutationKey: ['sendPasswordComment'],
    mutationFn: async () =>
      supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: 'http://localhost:3001.com/forget-password',
      }),
  });

  const { mutate: editPassword, isError: passwordError } = useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: async () => supabase.auth.admin.updateUserById(userid, { password: newPassword }),
  });

  const onClickHandler = () => {
    editUser();
    if (comment !== '' || comment !== commentData.comments) {
      if (Object.keys(commentData).length === 0) {
        addComment();
      } else {
        editComment();
      }
    }
    if (newPassword !== '') {
      editPassword();
    }
  };

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
                    <ToggleSelect
                      value={company}
                      options={companies}
                      label="Company"
                      onSave={setCompany}
                    />
                    <ToggleEdit value={fullname} label="Full Name" onSave={setFullname} />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <ToggleEdit value={email} label="E-mail" onSave={setEmail} />
                    <ToggleEdit value={phone} label="Mobile Number" onSave={setPhone} />
                  </div>
                  <TogglePass sendEmail={sendPasswordEmail} onSave={setNewPassword} />
                  <div className="flex flex-col gap-4">
                    <ToggleEditArea value={comment} label="Comments" onSave={setComment} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-8 pb-8 justify-end">
            <button className="btn btn-success mr-8" onClick={onClickHandler}>
              Save
            </button>
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

// -- Configure AuthGuard -- //
EditUser.allowAuthenticated = true;
EditUser.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default EditUser;
