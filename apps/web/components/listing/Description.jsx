import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ description }) => {
  const [maxHeight, setMaxHeight] = React.useState('');

  const checkOnClick = () => {
    if (document.getElementById('text-limit-button').checked === true) {
      document.getElementById('text-limit').style.maxHeight = 'none';
      return;
    }

    document.getElementById('text-limit').style.maxHeight = maxHeight;
  };

  React.useEffect(() => {
    setMaxHeight(document.getElementById('text-limit').style.maxHeight);
  }, []);

  return (
    <>
      <p
        id="text-limit"
        className='overflow-hidden relative max-h-text-limit leading-text-limit before:content-[""] before:absolute before:h-before-text-limit before:w-full before:bottom-0 before:pointer-events-none before:bg-gradient-to-b before:from-transparent before:to-[#ffffff]'
      >
        {description}
      </p>
      <input
        id="text-limit-button"
        className='appearance-none cursor-pointer before:content-["expand"] before:checked:content-["collapse"]'
        type="checkbox"
        onClick={checkOnClick}
      />
    </>
  );
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
