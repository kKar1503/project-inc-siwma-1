import PropTypes from 'prop-types';

const Detail = ({ title, detail }) => (
  <h3 className="text-xl">
    <span className="font-bold">{title}</span>: {detail}
  </h3>
);

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default Detail;
