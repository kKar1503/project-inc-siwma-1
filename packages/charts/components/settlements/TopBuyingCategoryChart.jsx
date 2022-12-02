import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { BarLine, BarToolTip, focus, reset, unfocus } from '../BarHover';
import Title from '../Title';

const color = '#5CBBCC';

// const mockData = [
//   { item: 'Item 1', amount: 360 },
//   { item: 'Item 2', amount: 320 },
//   { item: 'Item 3', amount: 260 },
//   { item: 'Item 4', amount: 200 },
//   { item: 'Item 5', amount: 190 },
//   { item: 'Item 6', amount: 190 },
// ].reverse();

const TopBuyingCategoryChart = ({ data }) => (
  <VictoryChart
    horizontal
    padding={{ left: 100, bottom: 50, right: 30, top: 50 }}
    domainPadding={40}
  >
    <Title text="Top 5 Buying Categories" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryAxis dependentAxis label="Posts" />
    <VictoryBar
      data={data}
      dataComponent={<BarLine />}
      labels={data.map(({ posts }) => posts)}
      labelComponent={<BarToolTip />}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onMouseEnter: () => [
              {
                eventKey: 'all',
                ...unfocus,
              },
              focus,
            ],
            onMouseLeave: () => [
              {
                eventKey: 'all',
                ...reset,
              },
            ],
          },
        },
      ]}
      x="category"
      y="posts"
      style={{ data: { fill: color } }}
    />
    <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
  </VictoryChart>
);

TopBuyingCategoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      posts: PropTypes.number,
    })
  ),
};

export default TopBuyingCategoryChart;
