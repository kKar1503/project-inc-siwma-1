/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

const chatHeader = () => (
  <div>
    <main>
      <div>
        <div className="navbar bg-base-100 border relative z-1">
          <div className="flex-1">
            <div className="btn btn-ghost btn-circle avatar">
              <div className="rounded-full min-[320px]:w-8 sm:w-8 md:w-10 lg:w-12">
                <Image src="/../public/sample-profile-image.jpg" width={80} height={80} />
              </div>
            </div>
            <div className="flex-col pl-5">
              <div className="font-bold min-[320px]:text-[0.6em] sm:text-[0.6em] md:text-[0.8em] lg:text-[1em]">
                <Link href="/">Name (Company)</Link>
              </div>
              <div className="min-[320px]:text-[0.5em] sm:text-[0.5em] md:text-[0.6em] lg:text-[0.8em]">
                Last seen 10 minutes ago
              </div>
            </div>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end relative">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-67 rounded-full">
                  <BsThreeDotsVertical />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute"
              >
                <li>
                  <a href="http://localhost:3001">Archive Chat</a>
                </li>
                <li>
                  <a href="http://localhost:3001">Block User</a>
                </li>
                <li>
                  <a href="http://localhost:3001">Delete Chat</a>
                </li>
                <li>
                  <a href="http://localhost:3001">Report User</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar bg-base-100 border relative block">
          <div className="flex-1">
            <div className="btn btn-circle btn-ghost avatar">
              <div className="min-[320px]:w-8 sm:w-8 md:w-10 lg:w-12 rounded-md">
                <Image src="/../public/sample-product-image.jpg" width={80} height={80} />
              </div>
              <div className="absolute h-3 bg-white min-[320px]:w-8 sm:w-8 md:w-10 lg:w-12 pb-13 mt-6">
                <div className="min-[320px]:text-[6px] sm:text-[6px] lg:text-[7px] text-center">
                  Reserved
                </div>
              </div>
            </div>
            <div className="flex-col pl-5">
              <div className="min-[320px]:text-[0.6em] sm:text-[0.6em] md:text-[0.8em] lg:text-[1em]">
                <Link href="/">Mild Steel Channel Hot Rolled (Bar 0.750 x 0.375 x 0.125)</Link>
              </div>
              <div className="font-bold min-[320px]:text-[0.6em] sm:text-[0.6em] md:text-[0.8em] lg:text-[1em]">
                Price
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default chatHeader;
