import PropTypes from 'prop-types';

/**
 * CarouselItemWrapper is a component that wraps a carousel item and must be used in side the <Carousel> component.
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */

const CarouselItemWrapper = ({ children, wrapperClassName = '' }) => (
  <div className={`carousel-item ${wrapperClassName}`}>{children}</div>
);

CarouselItemWrapper.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
};

export default CarouselItemWrapper;
