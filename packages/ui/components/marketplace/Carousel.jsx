import PropTypes from 'prop-types';

// Carousel adapted from Daisy UI's official documentation
const Carousel = ({ items }) => (
  <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
    {items.map((item) => (
      <div className="carousel-item">{item}</div>
    ))}
  </div>
);

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element),
};

export default Carousel;
