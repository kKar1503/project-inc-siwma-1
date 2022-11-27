import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { BarLine, BarToolTip, focus, reset, unfocus } from '../BarHover';
import Title from '../Title';

const color = '#6D96F2';

const TopSellingCategoryChart = ({ data }) => (
  <VictoryChart domainPadding={50}>
    <Title text="Top 5 Selling Catagories" />
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
    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Category" />
  </VictoryChart>
);

TopSellingCategoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      posts: PropTypes.number,
    })
  ),
};

export default TopSellingCategoryChart;
