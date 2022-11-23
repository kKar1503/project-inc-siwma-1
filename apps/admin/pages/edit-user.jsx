import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Image from 'next/image';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ToggleEdit from '../components/FormControl/ToggleEdit';
import ToggleEditArea from '../components/FormControl/ToggleEditArea';
import TogglePass from '../components/FormControl/TogglePass';

const EditUser = () => {
  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const fullName = 'John Doe';
  const email = 'E-mail';
  const companyName = 'Company';
  const mobileNumber = '9232 3232';
  const profilePic =
    'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg';

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
                  <ToggleEdit value={companyName} label="Company" />
                  <ToggleEdit value={fullName} label="Full Name" />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEdit value={email} label="E-mail" />
                  <ToggleEdit value={mobileNumber} label="Mobile Number" />
                </div>
                <TogglePass />
                <div className="flex flex-col gap-4">
                  <ToggleEditArea value="Comments" label="Comments" />
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
