import Image from 'next/image';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';

const NavBar = () => {
  const supabase = useSupabaseClient();

  const { data: loginData } = useQuery(['getLoginData'], async () => supabase.auth.getUser());

  const userid = loginData?.data.user.id;

  const { data: userData, error } = useQuery({
    queryKey: ['getUserData', userid],
    queryFn: async () => supabase.from('users').select('*').eq('id', userid),
    enabled: !!userid,
  });

  const user = userData?.data;

  const imageSrc =
    user && user[0].image
      ? `https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/user-image-bucket/${user[0].image}`
      : 'https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/user-image-bucket/default-user.png?t=2023-01-10T06%3A20%3A35.075Z';

  return (
    <div className="navbar bg-base-100 rounded-lg shadow-lg">
      <div className="flex-none lg:hidden">
        <label htmlFor="sidebar-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1" />
      <div className="block border-l border-gray-300 px-4 text-right leading-3">
        <p>{user ? user[0].fullname : 'Loading'}</p>
        <p className="text-sm font-thin">{user && user[0].permissions === 1 ? 'Admin' : 'User'}</p>
      </div>
      <div className="dropdown dropdown-end">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src={imageSrc} alt="profile-pic" width={80} height={80} />
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link href="/">Profile</Link>
          </li>
          <li>
            <Link href="/">Settings</Link>
          </li>
          <li>
            <Link href="/login">
              <button onClick={async () => supabase.auth.signOut()}>Logout</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
