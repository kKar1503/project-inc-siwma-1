import PropTypes from 'prop-types';
import { Children, useEffect, useRef, useState } from 'react';
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
const Carousel = ({
  name,
  children,
  carouselWrapperClassName = '',
  wrapperClassName = '',
  itemsToMoveBy = 1,
}) => {
  const mainCarouselRef = useRef(null);

  // These ref are the first and last item in the carousel
  const firstItemRef = useRef(null);
  const lastItemRef = useRef(null);

  // These state are for the first item visible and last item visible, this is so that the buttons will show up when the user scrolls to the end of the carousel
  const [firstItemVisible, setFirstItemVisible] = useState(false);
  const [lastItemVisible, setLastItemVisible] = useState(false);

  useEffect(() => {
    let firstItem;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFirstItemVisible(true);
          } else {
            setFirstItemVisible(false);
          }
        });
      },
      { threshold: 0.8, rootMargin: '100% 0% 100% 0%' }
    );

    if (firstItemRef.current) {
      firstItem = firstItemRef.current;
      observer.observe(firstItemRef.current);
    }

    return () => {
      if (firstItem) {
        observer.unobserve(firstItem);
      }
    };
  }, [firstItemRef, children]);

  // A hook for the last item
  useEffect(() => {
    let lastItem;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLastItemVisible(true);
          } else {
            setLastItemVisible(false);
          }
        });
      },
      { threshold: 0.8, rootMargin: '100% 0% 100% 0%' }
    );

    if (lastItemRef.current) {
      lastItem = lastItemRef.current;
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItem) {
        observer.unobserve(lastItem);
      }
    };
  }, [lastItemRef, children]);

  const scrollRight = () => {
    const widthToMoveBy = firstItemRef.current.getBoundingClientRect().width;
    if (mainCarouselRef.current) {
      mainCarouselRef.current.scrollBy({
        left: widthToMoveBy * itemsToMoveBy,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    const widthToMoveBy = firstItemRef.current.getBoundingClientRect().width;
    if (mainCarouselRef.current) {
      mainCarouselRef.current.scrollBy({
        left: -widthToMoveBy * itemsToMoveBy,
        behavior: 'smooth',
      });
    }
  };

  return (
    // Carousel container
    // flex because we want the carousel buttons to be centered vertically
    // Relative positioning so that the carousel buttons can be positioned absolutely
    <div className="flex items-center relative">
      {/* Carousel buttons */}
      {/* Carousel buttons are position absolutely */}
      <div className="carousel-buttons flex w-full justify-between px-1 absolute">
        {!firstItemVisible ? (
          <IconRoundButton
            icon={<IoChevronBack size={16} />}
            onClick={scrollLeft}
            className="z-30"
          />
        ) : (
          <div />
        )}

        {/* Next button */}
        {!lastItemVisible ? (
          <IconRoundButton
            icon={<IoChevronForward size={16} />}
            onClick={scrollRight}
            className="z-30"
          />
        ) : (
          <div />
        )}
      </div>

      {/* <div className="left-0 w-[20px] h-full bg-gradient-to-r from-white to-transparent absolute z-20" />
      <div className="right-0 w-[20px] h-full bg-gradient-to-r from-transparent to-white absolute z-20" /> */}

      {/* Carousel items itself */}
      <div
        className={`w-full carousel carousel-center space-x-4 rounded-box ${carouselWrapperClassName}`}
        ref={mainCarouselRef}
      >
        {Children.map(children, (child, index) => {
          if (index === 0) {
            return (
              <div className={`carousel-item ${wrapperClassName}`} ref={firstItemRef}>
                {child}
              </div>
            );
          }

          if (index === Children.count(children) - 1) {
            return (
              <div className={`carousel-item ${wrapperClassName}`} ref={lastItemRef}>
                {child}
              </div>
            );
          }

          return <div className={`carousel-item ${wrapperClassName}`}>{child}</div>;
        })}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  carouselWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  itemsToMoveBy: PropTypes.number,
};

export default Carousel;