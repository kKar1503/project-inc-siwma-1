import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import Title from '../Title';

const color = '#5CBBCC';

const mockData = [
  { item: 'Item 1', amount: 360 },
  { item: 'Item 2', amount: 320 },
  { item: 'Item 3', amount: 260 },
  { item: 'Item 4', amount: 200 },
  { item: 'Item 5', amount: 190 },
  { item: 'Item 6', amount: 190 },
].reverse();

const TopSellingItemsChart = ({ data = mockData }) => (
  <VictoryChart
    horizontal
    padding={{ left: 100, bottom: 50, right: 30, top: 50 }}
    domainPadding={40}
  >
    <Title text="Top 6 Selling Items in 2022" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryAxis dependentAxis label="Amount" />
    <VictoryBar data={data} x="item" y="amount" style={{ data: { fill: color } }} />
    <VictoryAxis
      style={{ tickLabels: { fontSize: 10 } }}
      label="Items"
      axisLabelComponent={<VictoryLabel dy={-30} />}
    />
  </VictoryChart>
);

TopSellingItemsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      posts: PropTypes.number,
    })
  ),
};

export default TopSellingItemsChart;
