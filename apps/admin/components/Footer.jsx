/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import PropType from 'prop-types';
import pic from '../public/SIWMALOGOFULL.png';

const Footer = ({ arrayOfPages }) => (
  <footer className="p-6 bg-white sm:p-10 2xl:p-14">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0 text-center sm:text-left ">
        <Link href="#" className="flex items-center h-auto w-auto">
          <Image
            src={pic}
            className="mr-3 h-full"
            alt="SIW Logo"
            height={100}
            width={400}
            priority
          />
        </Link>

        <p className="font-inter regular mt-10">
          1014 geylang East Ave 3 #07-242 <br /> Singapore 389729
        </p>
        <p className="font-inter regular mt-2">
          Tel/Fax:
          <a className="text-[#2563EB]" href="tel:+65 68422275">
            +65 6842 2275
          </a>
        </p>
        <p className="font-inter regular  mt-2 ">
          Email:
          <a className="text-[#2563EB]" href="mailto:info@siwma.org.sg">
            info@siwma.org.sg
          </a>
        </p>
      </div>

      <div className="grid grid-cols-2 ml-8 gap-10 2xl:gap-24 sm:grid-cols-3">
        {arrayOfPages.map((group) => (
          <div key={group.category} className="max-w-xs">
            <h2 className="mb-6 text-base 2xl:text-lg font-bold text-gray-900 normalcase">
              {group.category}
            </h2>
            <ul className="text-gray-600 text-base 2xl:text-lg">
              {group.pages.map((page) => (
                <li className="mb-6" key={page.name}>
                  <Link
                    href={page.url}
                    className="hover:underline whitespace-pre-wrap break-words ..."
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="sm:flex sm:items-center sm:justify-between my-10">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright © 2022
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
);

Footer.propTypes = {
  arrayOfPages: PropType.arrayOf(
    PropType.shape({
      category: PropType.string.isRequired,
      pages: PropType.arrayOf(
        PropType.shape({
          name: PropType.string.isRequired,
          url: PropType.string.isRequired,
        }).isRequired
      ),
    }).isRequired
  ).isRequired,
};

export default Footer;
