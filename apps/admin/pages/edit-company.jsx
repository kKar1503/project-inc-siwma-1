import { useState } from 'react';
import Image from 'next/image';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import ToggleEdit from '../components/FormControl/ToggleEdit';
import ToggleEditArea from '../components/FormControl/ToggleEditArea';

const EditCompany = () => {
  // SET ALL USER DATA HERE (PROBABLY USE THE API CALL TO GET USER DATA)
  const website = 'John Doe';
  const companyName = 'Company';
  const bio = 'the most poggers company in all of existence';
  const profilePic =
    'https://spoxwyiorgijkrqidutq.supabase.co/storage/v1/object/public/companyprofilepictures/example.jpg';

  const comments = 'comments';

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow h-fit shadow-xl rounded-2xl bg-base-100">
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">Edit Company</h1>
          {/* If you want, you can use the company's name to replace 'company' in the heading below as well */}
          <h1>Edit company details manually below</h1>
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
                  <ToggleEdit value={companyName} label="Company Name" />
                  <ToggleEdit value={website} label="Website" />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <ToggleEditArea value={bio} label="Company Bio" maxLength={255} />
                </div>
                <div className="flex flex-col gap-4">
                  <ToggleEditArea value={comments} label="Comments" maxLength={255} />
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
