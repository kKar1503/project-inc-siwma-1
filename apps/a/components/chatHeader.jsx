import { BsThreeDotsVertical } from 'react-icons/Bs';
import Image from 'next/image';
import Link from 'next/link';

const chatHeader = () => (
  <div>
    <main>
      <div>
        <div className='navbar bg-base-100 rounded-t-md w-[700px] border relative z-1'>
          <div className='flex-1'>
            <div className='btn btn-ghost btn-circle avatar'>
              <div className='rounded-full'>
                <Image
                  src='/../public/sample-profile-image.jpg'
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className='flex-col pl-5'>
              <div className='font-bold'>
                <Link href='/'>Name (Company)</Link>
              </div>
              <div className='text-xs'>Last seen 10 minutes ago</div>
            </div>
          </div>
          <div className='flex-none gap-2'>
            <div className='dropdown dropdown-end relative'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-67 rounded-full'>
                  <BsThreeDotsVertical />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute'
              >
                <li>
                  <a>Archive Chat</a>
                </li>
                <li>
                  <a>Block User</a>
                </li>
                <li>
                  <a>Delete Chat</a>
                </li>
                <li>
                  <a>Report User</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='navbar bg-base-100 rounded-b-md w-[700px] border relative block'>
          <div className='flex-1'>
            <div className='btn btn-circle btn-ghost avatar'>
              <div className='w-10 rounded-md'>
                <Image
                  src='/../public/sample-product-image.jpg'
                  width={80}
                  height={80}
                />
              </div>
              <div className='absolute h-3 bg-white w-10 pb-13 mt-6'>
                <div className='absolute text-[7px] pl-1'>Reserved</div>
              </div>
            </div>
            <div className='flex-col pl-5'>
              <div>
                <Link href='/'>
                  Mild Steel Channel Hot Rolled (Bar 0.750 x 0.375 x 0.125)
                </Link>
              </div>
              <div className='font-bold'>Price</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default chatHeader;
