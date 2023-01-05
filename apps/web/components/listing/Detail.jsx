import PropTypes from 'prop-types';

/**
 * A component that displays a title and a detail
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
*/
const Detail = ({ title, detail }) => (
  <h3 className="text-xl">
    <span className="font-bold">{title}</span>: {detail}
  </h3>
);

const propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

Detail.propTypes = propTypes;

export default Detail;
