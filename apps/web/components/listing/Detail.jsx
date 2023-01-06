import PropTypes from 'prop-types';

const Detail = ({ title, detail }) => (
  <p>
    <span className="text-sm block text-gray-400">{title}</span>

    <span className="block">{detail}</span>
  </p>
);

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default Detail;
