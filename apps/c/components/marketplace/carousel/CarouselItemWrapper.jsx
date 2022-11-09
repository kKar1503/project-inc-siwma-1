import PropTypes from 'prop-types';

const CarouselItemWrapper = ({ children }) => <div className="carousel-item">{children}</div>;

CarouselItemWrapper.propTypes = {
  children: PropTypes.node,
};

export default CarouselItemWrapper;
