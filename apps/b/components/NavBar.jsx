import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/">Profile</Link>
        </li>
        <li>
          <Link href="/">Settings</Link>
        </li>
        <li>
          <Link href="/">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default NavBar;
