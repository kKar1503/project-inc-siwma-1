/* eslint-disable no-plusplus */
import AdminFigure from '../components/AdminFigure';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

const UserOverview = () => (
  <div className="flex flex-col w-full h-full gap-8 p-8 overflow-auto">
    {/* { replace this with sidebar } */}
    <NavBar />

    <div className="flex flex-row gap-8 flex-wrap">
      <AdminFigure title="Active Companies" value="20" color="text-primary" />
      <AdminFigure title="Total Users" value="14" color="text-accent" />
      <AdminFigure title="Pending Invites" value="15" color="text-secondary" />
    </div>

    <div className="flex flex-row flex-wrap gap-8">
      <div className="flex flex-[7]">
        <div className="bg-base-100 w-full h-fit shadow-lg rounded-2xl">
          <div className="flex flex-row justify-between items-center gap-8 p-6">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">Registered Users</h1>
              <p>Showing 1-5 of 14 users</p>
            </div>
            <div className="flex flex-col gap-4">
              <SearchBar placeholder="Search by e-mail" />
            </div>
          </div>
          <div className="w-full h-px bg-base-300" />
          {/* replace with div component */}
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-row justify-between h-8 bg-accent items-center gap-8 px-8 w-full">
              <div className="flex flex-row items-center">
                <div className="h-px w-20" />
                <p className="text-base-100 text-base">User</p>
              </div>
              <p className="text-base-100">E-mail</p>
              <p className="text-base-100">Company</p>
              <p className="text-base-100">Mobile Number</p>
              <p className="text-base-100">Actions</p>
            </div>
            <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
              <div className="flex flex-row items-center">
                <div className="h-9 w-9 mr-11 rounded-full bg-base-300" />
                <p>Wo Shao</p>
              </div>
              <p>WoShao@gmail.com</p>
              <p>LI FANG IRONWORKS</p>
              <p>+65 9854 7482</p>
              <p className="mr-4">O O O</p>
            </div>
            <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
              <div className="flex flex-row items-center">
                <div className="h-9 w-9 mr-11 rounded-full bg-base-300" />
                <p>Wo Shao</p>
              </div>
              <p>WoShao@gmail.com</p>
              <p>LI FANG IRONWORKS</p>
              <p>+65 9854 7482</p>
              <p className="mr-4">O O O</p>
            </div>
            <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
              <div className="flex flex-row items-center">
                <div className="h-9 w-9 mr-11 rounded-full bg-base-300" />
                <p>Wo Shao</p>
              </div>
              <p>WoShao@gmail.com</p>
              <p>LI FANG IRONWORKS</p>
              <p>+65 9854 7482</p>
              <p className="mr-4">O O O</p>
            </div>
            <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
              <div className="flex flex-row items-center">
                <div className="h-9 w-9 mr-11 rounded-full bg-base-300" />
                <p>Wo Shao</p>
              </div>
              <p>WoShao@gmail.com</p>
              <p>LI FANG IRONWORKS</p>
              <p>+65 9854 7482</p>
              <p className="mr-4">O O O</p>
            </div>
            <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
              <div className="flex flex-row items-center">
                <div className="h-9 w-9 mr-11 rounded-full bg-base-300" />
                <p>Wo Shao</p>
              </div>
              <p>WoShao@gmail.com</p>
              <p>LI FANG IRONWORKS</p>
              <p>+65 9854 7482</p>
              <p className="mr-4">O O O</p>
            </div>
          </div>
          <div className="w-full h-px bg-base-300" />
          <div className="flex flex-row justify-end gap-8 p-6">
            <div className="btn-group">
              <button className="btn bg-accent border-accent">1</button>
              <button className="btn">2</button>
              <button className="btn">3</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-[5] w-full grow-none">
        <div className="bg-base-100 w-full h-fit shadow-lg rounded-2xl">
          <div className="flex flex-row justify-between items-center gap-8 p-6">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">Pending Invites</h1>
              <p>Showing 1-5 of 15 invites</p>
            </div>
            <div className="flex flex-col gap-4">
              <SearchBar placeholder="Search by e-mail" />
            </div>
          </div>
          <div className="w-full h-px bg-base-300" />
          {/* replace with div component */}
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-row justify-between h-8 bg-secondary items-center gap-8 px-8 w-full">
              <p className="text-base-100">Company</p>
              <p className="text-base-100">E-mail</p>
              <p className="text-base-100">Actions</p>
            </div>
          </div>
          <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
            <p>LI FANG IRONWORKS</p>
            <p>WoShao@gmail.com</p>
            <p className="mr-4">O O O</p>
          </div>
          <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
            <p>LI FANG IRONWORKS</p>
            <p>WoShao@gmail.com</p>
            <p className="mr-4">O O O</p>
          </div>
          <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
            <p>LI FANG IRONWORKS</p>
            <p>WoShao@gmail.com</p>
            <p className="mr-4">O O O</p>
          </div>
          <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
            <p>LI FANG IRONWORKS</p>
            <p>WoShao@gmail.com</p>
            <p className="mr-4">O O O</p>
          </div>
          <div className="flex flex-row justify-between h-16 items-center gap-8 px-8 w-full hover:bg-base-200">
            <p>LI FANG IRONWORKS</p>
            <p>WoShao@gmail.com</p>
            <p className="mr-4">O O O</p>
          </div>
          <div className="w-full h-px bg-base-300" />
          <div className="flex flex-row justify-end gap-8 p-6">
            <div className="btn-group">
              <button className="btn bg-secondary border-secondary">1</button>
              <button className="btn">2</button>
              <button className="btn">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

UserOverview.getLayout = (page) => <AdminPageLayout pageName="Overview">{page}</AdminPageLayout>;

export default UserOverview;
