import PropTypes from 'prop-types';
import React, { Children, useEffect, useRef } from 'react';

const InfiniteScroll = ({
  children,
  onLoadMore,
  loading,
  reachedMaxItems,
  className = '',
  wrapperClassName = '',
}) => {
  const lastItemRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    let lastItem;

    if (lastItemRef.current) {
      lastItem = lastItemRef.current;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (reachedMaxItems || loading) return;
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      if (lastItem) {
        observerRef.current.unobserve(lastItem);
      }
    };
  }, [children, lastItemRef, onLoadMore, reachedMaxItems]);

  return (
    <>
      <div className={className}>
        {Children.map(children, (child, index) => {
          if (index === children.length - 1) {
            return (
              <div key={index} className={wrapperClassName} ref={lastItemRef}>
                {child}
              </div>
            );
          }
          return (
            <div key={index} className={wrapperClassName}>
              {child}
            </div>
          );
        })}
      </div>

      {loading && <div className="text-center my-5">Loading more items...</div>}
      {reachedMaxItems && (
        <div className="text-center my-5">You&apos;ve reached the end of the universe!</div>
      )}
    </>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reachedMaxItems: PropTypes.bool.isRequired,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
};

export default InfiniteScroll;
