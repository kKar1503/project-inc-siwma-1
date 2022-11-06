import Image from 'next/image';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ChatRoom = ({ onCheckCB }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (checked) => {
    setIsChecked(checked);
    if (typeof onCheckCB === 'function') {
      onCheckCB(checked);
    }
  };

  const toggleChecked = () => handleOnChange(!isChecked);

  return (
    <li className=" group border-b border-gray-300">
      <a href="localhost:3000/">
        <div className="w-1/6">
          {/* TODO: Please add additional functionality in the future */}
          {true && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleChecked}
              className={cx('hover:visible group-hover:flex', { hidden: isChecked })}
            />
          )}
        </div>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <Image src="/" alt="placeholder" width="0" height="0" />
          </div>
        </div>

        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-bs text-gray-600">
              Aditya Adeeb (Leong Seng Metal Pte.Ltd.)
            </span>
            <span className="block ml-2 text-xs text-gray-600">31/10/2022</span>
          </div>
          <div className="avatar">
            <span className="block ml-2 text-sm text-gray-600">Product Name</span>
            <div className="w-14 rounded ml-48">
              <Image src="/" alt="Tailwind-CSS-Avatar-component" width="0" height="0" />
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

ChatRoom.propTypes = {
  onCheckCB: PropTypes.oneOf(PropTypes.func).isRequired,
};

export default ChatRoom;
