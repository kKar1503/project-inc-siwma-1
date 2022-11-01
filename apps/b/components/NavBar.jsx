import Image from 'next/image';

const NavBar = () => (
  <div className="navbar bg-base-100 rounded-lg shadow-lg">
    <div className="flex-1" />
    <div className="block border-l border-gray-300 px-4 text-right leading-3">
      <p>System Adminstrator</p>
      <p className="text-sm font-thin">Admin</p>
    </div>
    <div className="dropdown dropdown-end">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-tabindex */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image src="/../public/sample-profile-pic.jpg" alt="profile-pic" width={80} height={80} />
        </div>
      </label>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a href="/">Profile</a>
        </li>
        <li>
          <a href="/">Settings</a>
        </li>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </div>
  </div>
);

export default NavBar;
