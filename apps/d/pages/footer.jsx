/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import pic from './image/SIWMALOGOFULL.png';

const Footer = () => (
  <>
    <div />
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900 mx-20">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0 ">
          <a href="#" className="flex items-center h-auto w-auto">
            <Image src={pic} className="mr-3 h-10" alt="SIW Logo" height={100} width={400} />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span> */}
          </a>

          <p className="font-inter regular mt-10">
            1014 geylang East Ave 3 #07-242 <br /> Singapore 389729
          </p>
          <p className="font-inter regular mt-2">
            Tel/Fax:
            <a className="text-[#2563EB]" href="tel:+65 68422275">
              {' '}
              +65 6842 2275
            </a>
          </p>
          <p className="font-inter regular  mt-2 ">
            Email:{' '}
            <a className="text-[#2563EB]" href="mailto:info@siwma.org.sg">
              info@siwma.org.sg
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-32 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
              Services
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 text-xs">
              <li className="mb-6">
                <a href="#" className="hover:underline">
                  Loreum ipsum
                </a>
              </li>
              <li className="mb-6">
                <a href="#" className="hover:underline">
                  Loreum ipsum
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Loreum ipsum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
              About
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 text-xs">
              <li className="mb-6">
                <a href="#" className="hover:underline ">
                  Our story
                </a>
              </li>
              <li className="mb-6">
                <a href="#" className="hover:underline">
                  Loreum ipsum
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Loreum ipsum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">
              Help & Support
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 text-xs">
              <li className="mb-6">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
      <div className="sm:flex sm:items-center sm:justify-between my-10">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright © 2022{' '}
          <a href="#" className="hover:underline">
            SIW
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-20 sm:justify-center sm:mt-0">
          <p className="text-xs">Terms & Conditions</p>
          <p className="text-xs">Privacy Policy</p>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
