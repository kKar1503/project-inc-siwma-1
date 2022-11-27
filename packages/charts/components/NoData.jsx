import { VictoryGroup, VictoryLabel } from 'victory';

const NoData = () => (
  <VictoryGroup>
    <VictoryLabel x={225} y={150} text="No data" textAnchor="middle" style={{ fontSize: 40 }} />
  </VictoryGroup>
);

export default NoData;
