import cx from 'classnames';
import PropTypes from 'prop-types';
import { Children, useEffect, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import IconRoundButton from './IconRoundButton';

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

const Carousel = ({
  children,
  showButtons = true,
  carouselWrapperClassName = '',
  wrapperClassName = '',
  itemsToMoveBy = 1,
  onReachedEnd,
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
  }, [lastItemRef, children, onReachedEnd]);

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

      <div
        className={cx('hidden md:block', {
          'md:hidden': !showButtons,
        })}
      >
        {(Children.count > 1 || !firstItemVisible) && (
          <IconRoundButton
            icon={<IoChevronBack size={20} />}
            onClick={scrollLeft}
            className="z-30 absolute -left-8 top-1/2"
          />
        )}

        {/* Next button */}
        {(Children.count > 1 || !lastItemVisible) && (
          <IconRoundButton
            icon={<IoChevronForward size={20} />}
            onClick={scrollRight}
            className="z-30 absolute -right-8 top-1/2"
          />
        )}
      </div>

      {/* <div className="left-0 w-[20px] h-full bg-gradient-to-r from-white to-transparent absolute z-20" />
      <div className="right-0 w-[20px] h-full bg-gradient-to-r from-transparent to-white absolute z-20" /> */}

      {/* Carousel items itself */}
      <div
        className={cx('w-full carousel carousel-center space-x-3 rounded-box', {
          [carouselWrapperClassName]: carouselWrapperClassName,
        })}
        ref={mainCarouselRef}
      >
        {Children.map(children, (child, index) => {
          if (index === 0) {
            return (
              <div
                className={cx('carousel-item', {
                  [wrapperClassName]: wrapperClassName,
                })}
                ref={firstItemRef}
              >
                {child}
              </div>
            );
          }

          if (index === Children.count(children) - 1) {
            return (
              <div
                className={cx('carousel-item', {
                  [wrapperClassName]: wrapperClassName,
                })}
                ref={lastItemRef}
              >
                {child}
              </div>
            );
          }

          return (
            <div
              className={cx('carousel-item', {
                [wrapperClassName]: wrapperClassName,
              })}
            >
              {child}
            </div>
          );
        })}
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
Carousel.propTypes = {
  children: PropTypes.node,
  carouselWrapperClassName: PropTypes.string,
  showButtons: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  itemsToMoveBy: PropTypes.number,
  onReachedEnd: PropTypes.func,
};

export default Carousel;
