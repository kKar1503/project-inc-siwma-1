import Image from 'next/image';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ChatDiv = ({ isCheckCallback, members }) => {
  const [isChecked, setIsChecked] = useState(false);

  // const handleOnChange = () => {
  //   setIsChecked(!isChecked);
  // };

  // useEffect(() => {
  //   isCheckCallback(isChecked);
  // }, [isChecked]);

  // cannot uncheck checkbox need help
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    isCheckCallback(isChecked);
  }, [isChecked]);
  // console.log(members);
  //  console.log(members?.name)

  return (
    <li className="flex group border-b border-gray-300">
      <a href="localhost:3000/">
        <div className="w-1/6">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
            className={`checkbox ${isChecked ? '' : 'hidden'} group-hover:flex`}
          />
        </div>
        <div className="avatar online">
          <div className="min-[320px]:w-8 sm:w-8 md:w-10 lg:w-12 rounded-full">
            <Image
              src="/../public/sample-profile-image.jpg"
              alt="placeholder"
              width="0"
              height="0"
            />
          </div>
        </div>

        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600 min-[320px]:text-[0.6em] sm:text-[0.6em] md:text-[0.8em] lg:text-[1em]">
              Aditya Adeeb (Leong Seng Metal Pte.Ltd.)
            </span>
            <span className="block ml-2 min-[320px]:text-[0.4em] sm:text-[0.4em] md:text-[0.6em] lg:text-[0.8em] text-gray-600 min-[320px]:mr-20 min-[880px]:mr-0">
              31/10/2022
            </span>
          </div>
          <div className="avatar">
            <span className="block ml-2 min-[320px]:text-[0.5em] sm:text-[0.5em] md:text-[0.7em] lg:text-[0.9em] text-gray-600 ">
              Product Name
            </span>
            <div className="flex min-[320px]:w-8 sm:w-8 md:w-10 lg:w-12 rounded ml-48 min-[320px]:mr-20 min-[880px]:mr-0">
              <Image
                src="/../public/sample-product-image.jpg"
                alt="Tailwind-CSS-Avatar-component"
                width="0"
                height="0"
              />
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

ChatDiv.propTypes = {
  isCheckCallback: PropTypes.func.isRequired,
  members: PropTypes.func.isRequired,
};

export default ChatDiv;
