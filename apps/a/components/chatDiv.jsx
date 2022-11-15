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
    <li className=" group border-b border-gray-300">
      {/* TODO: Change href link */}
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
          <div className="w-12 rounded-full">
            <Image src="https://placeimg.com/80/80/people" alt="placeholder" width="0" height="0" />
          </div>
        </div>

        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-bs text-gray-600">{members?.name}</span>
            <span className="block ml-2 text-xs text-gray-600">31/10/2022</span>
          </div>
          <div className="avatar">
            <span className="block ml-2 text-sm text-gray-600">Product Name</span>
            <div className="w-14 rounded ml-48">
              <Image
                src="https://placeimg.com/80/80/people"
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
