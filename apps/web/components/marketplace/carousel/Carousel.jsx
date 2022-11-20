import PropTypes from 'prop-types';
import { useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import IconRoundButton from './IconRoundButton';

/**
 * Carousel is a component that renders its items as a carousel item.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

// Carousel adapted from Daisy UI's official documentation

/*
  ! How to use:
  Every carousel item must be wrapped in a CarouselItemWrapper component.
  So in a typical use case:

  <Carousel> <- Carousel component
    <CarouselItemWrapper> <- Every carousel item must be wrapped in this component
      <Item1 />
    </CarouselItemWrapper>

    <CarouselItemWrapper>
      <>
        <Icon />
        <Item2 />
      </>
    </CarouselItemWrapper>
  </Carousel>
*/
const Carousel = ({ children }) => {
  const carouselContainerRef = useRef(null);

  const nextButtonHandler = () => {
    const elem = carouselContainerRef.current;
    if (elem) {
      const elemDimensions = elem.getBoundingClientRect();
      const { width } = elemDimensions;
      elem.scrollLeft += width;
    }
  };

  const previousButtonHandler = () => {
    const elem = carouselContainerRef.current;
    if (elem) {
      // Get bounding client rect is so that we can get the width of the carousel container
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
      const elemDimensions = elem.getBoundingClientRect();

      const { width } = elemDimensions;

      // Scroll left is like the user scrolling left on the element but we take the width of the container / 2
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
      elem.scrollLeft -= width;
    }
  };

  return (
    // Carousel container
    // flex because we want the carousel buttons to be centered vertically
    // Relative positioning so that the carousel buttons can be positioned absolutely
    <div className="flex items-center relative">
      {/* Carousel buttons */}
      {/* Carousel buttons are position absolutely */}
      <div className="carousel-buttons z-30 flex w-full justify-between px-1 absolute">
        <IconRoundButton icon={<IoChevronBack size={16} />} onClick={previousButtonHandler} />

        {/* Next button */}
        <IconRoundButton icon={<IoChevronForward size={16} />} onClick={nextButtonHandler} />
      </div>

      {/* <div className="left-0 w-[20px] h-full bg-gradient-to-r from-white to-transparent absolute z-20" />
      <div className="right-0 w-[20px] h-full bg-gradient-to-r from-transparent to-white absolute z-20" /> */}

      {/* Carousel items itself */}
      <div
        className="w-full carousel carousel-center space-x-4 rounded-box"
        ref={carouselContainerRef}
      >
        {children}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
};

export default Carousel;
