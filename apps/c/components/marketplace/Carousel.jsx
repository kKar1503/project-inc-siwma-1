import PropTypes from 'prop-types';
import { useState } from 'react';

// Carousel adapted from Daisy UI's official documentation
const Carousel = ({ items, name }) => {
  const [currentFocus, setCurrentFocus] = useState(0);

  const nextButtonHandler = () => {
    if (currentFocus + 1 > items.length - 1) {
      setCurrentFocus(0);
    } else {
      setCurrentFocus(currentFocus + 1);
    }
  };

  const previousButtonHandler = () => {
    setCurrentFocus(Math.max(currentFocus - 1, 0));
  };

  return (
    // Carousel container
    // flex because we want the carousel buttons to be centered vertically
    // Relative positioning so that the carousel buttons can be positioned absolutely
    <div className="flex w-screen max-h-min items-center relative">
      {/* Carousel buttons */}
      {/* Carousel buttons are position absolutely */}
      <div className="carousel-buttons z-10 flex w-full justify-between px-2 absolute">
        {/* Previous button */}
        <button
          onClick={previousButtonHandler}
          className="btn btn-square btn-sm rounded-md shadow-lg"
        >
          <a href={`#${name}-${currentFocus}`}>&lt;</a>
        </button>

        {/* Next button */}
        <button onClick={nextButtonHandler} className="btn btn-square btn-sm rounded-md shadow-lg">
          <a href={`#${name}-${currentFocus}`}>&gt;</a>
        </button>
      </div>

      {/* Carousel items itself */}
      <div className="carousel carousel-center p-4 space-x-4 rounded-box">
        {items.map((item, index) => (
          // Note that the id is the same as the href of the buttons
          <div key={item.id} className="carousel-item" id={`${name}-${index}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element),
  name: PropTypes.string.isRequired,
};

export default Carousel;
