import cx from 'classnames';
import PropTypes from 'prop-types';
import { Children, useEffect, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// Carousel adapted from Daisy UI's official documentation with functionality that is dynamic and can be used with any number of items.

/*
  ! How to use:
  Typical use case:
  (Read the PropTypes definition below to understand how to use the component)

  <Carousel> <- Carousel component
    <Item1 />

    <>
      <Icon />
      <Item2 />
    </>
  </Carousel>
*/

/**
 * Carousel is a component that renders its items as a carousel item.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

const AnimatedCarousel = ({
  children,
  carouselWrapperClassName = '',
  wrapperClassName = '',
  onReachedEnd,
  animationDuration = 3000,
}) => {
  const mainCarouselRef = useRef(null);

  // These ref are the first and last item in the carousel
  const firstItemRef = useRef(null);
  const lastItemRef = useRef(null);

  // These state are for the first item visible and last item visible, this is so that the buttons will show up when the user scrolls to the end of the carousel
  const [firstItemVisible, setFirstItemVisible] = useState(false);
  const [lastItemVisible, setLastItemVisible] = useState(false);

  const numberOfItems = useState(Children.count(children));

  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef(null);

  // useCallback(() => {
  //   setNumberOfItems(Children.count(children));
  // }, [children]);

  const scrollRight = () => {
    // Read more here as to why we use modulo operators
    // https://dev.to/ranewallin/this-simple-math-hack-lets-you-create-an-image-carousel-without-any-if-statements-5chj
    setActiveIndex((prev) => (prev + 1) % numberOfItems);
  };

  const moveToSlide = (index) => {
    const widthToMoveBy = firstItemRef.current.getBoundingClientRect().width;
    if (mainCarouselRef.current) {
      mainCarouselRef.current.scrollTo({
        left: widthToMoveBy * index,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    setActiveIndex((prev) => (prev - 1 + numberOfItems) % numberOfItems);
  };

  // usEffect to increase active index every animationDuration ms
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      scrollRight();
    }, animationDuration);

    return () => clearInterval(intervalRef.current);
  }, [animationDuration, numberOfItems, children]);

  // Every time the user is on a new slide, clearInterval and re-run the useEffect above
  useEffect(() => {
    moveToSlide(activeIndex);

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      scrollRight();
    }, animationDuration);

    return () => clearInterval(intervalRef.current);
  }, [activeIndex, animationDuration, numberOfItems, children]);

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
            if (onReachedEnd) {
              onReachedEnd();
            } else {
              setLastItemVisible(true);
            }
          } else {
            setLastItemVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100% 0% 100% 0%' }
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
  }, [lastItemRef, children, onReachedEnd]);

  return (
    <div className="flex items-center relative rounded-xl">
      {/* Carousel buttons */}
      {/* Carousel buttons are position absolutely */}
      <div className="carousel-buttons flex w-full justify-between absolute h-full">
        <button
          onClick={scrollLeft}
          className="z-30 bg-gradient-to-r from-black/50  to-transparent px-5 text-white rounded-xl"
        >
          <IoChevronBack size={25} />
        </button>

        {/* Next button */}
        <button
          onClick={scrollRight}
          className="z-30 bg-gradient-to-r to-black/50  from-transparent px-5 text-white rounded-xl"
        >
          <IoChevronForward size={25} />
        </button>
      </div>

      {/* <div className="left-0 w-[20px] h-full bg-gradient-to-r from-white to-transparent absolute z-20" />
      <div className="right-0 w-[20px] h-full bg-gradient-to-r from-transparent to-white absolute z-20" /> */}

      {/* Carousel items itself */}
      <div
        className={cx('w-full carousel carousel-center space-x-3 rounded-xl', {
          [carouselWrapperClassName]: carouselWrapperClassName,
        })}
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

      {/* Carousel Slides */}
      <div className="flex w-full gap-2 my-3 justify-center absolute bottom-0 items-center">
        {[...Array(numberOfItems)].map((_, index) => (
          <button
            aria-label="Carousel button"
            key={index}
            className={`w-9 h-[3px] drop-shadow-lg bg-white/50 rounded-full ${
              index === activeIndex ? 'bg-white/90' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

/*
  ! PropTypes Definition
  children: The items to be rendered in the carousel (Just put it inside the Carousel component)
  carouselWrapperClassName: Optional, the class name for the carousel wrapper
  wrapperClassName: Optional, the class name for each of the surrounding divs of each item
  itemsToMoveBy: Optional, the number of items to move by when the user clicks the buttons
  onReachedEnd: Optional, a callback function that will be called when the user reaches the end of the carousel (can be used to load more items)
*/
AnimatedCarousel.propTypes = {
  children: PropTypes.node,
  carouselWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onReachedEnd: PropTypes.func,
  animationDuration: PropTypes.number,
};

export default AnimatedCarousel;
