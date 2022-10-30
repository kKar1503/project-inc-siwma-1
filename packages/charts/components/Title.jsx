import { VictoryLabel } from 'victory';

// eslint-disable-next-line react/jsx-props-no-spreading
const Title = (props) => (
  <VictoryLabel x={200} y={20} style={{ fontSize: 20 }} textAnchor="middle" {...props} />
);

export default Title;
