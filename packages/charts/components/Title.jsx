import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';

const Title = ({ text }) => (
  <VictoryLabel x={200} y={20} style={{ fontSize: 20 }} textAnchor="middle" text={text} />
);

Title.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default Title;
