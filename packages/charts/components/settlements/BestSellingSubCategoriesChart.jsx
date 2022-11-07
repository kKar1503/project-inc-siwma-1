import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory';
import { getNumberWithOrdinal } from '../../utils/format';
import Title from '../Title';

const colors = ['#2563EB', '#6D96F2', '#91B0F5'];

const mockData = [
  [
    { category: 'Cat1', posts: 32 },
    { category: 'Cat2', posts: 3 },
    { category: 'Cat3', posts: 16 },
    { category: 'Cat4', posts: 18 },
  ],
  [
    { category: 'Cat1', posts: 24 },
    { category: 'Cat2', posts: 10 },
    { category: 'Cat3', posts: 25 },
    { category: 'Cat4', posts: 28 },
  ],
  [
    { category: 'Cat1', posts: 8 },
    { category: 'Cat2', posts: 8 },
    { category: 'Cat3', posts: 8 },
    { category: 'Cat4', posts: 13 },
  ],
];

const BestSellingSubCategoriesChart = ({ data = mockData }) => (
  <VictoryChart domainPadding={50}>
    <Title text="Top 3 Best Selling Sub Categories" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryAxis dependentAxis label="Posts" />
    <VictoryGroup offset={15} colorScale={colors}>
      {data.map((sub, i) => (
        <VictoryBar
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          data={sub}
          x="category"
          y="posts"
        />
      ))}
    </VictoryGroup>
    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Company" />
    <VictoryLegend
      x={350}
      y={10}
      rowGutter={-12}
      data={data.map((_, i) => ({ name: getNumberWithOrdinal(i + 1), symbol: { type: 'square' } }))}
      colorScale={colors}
    />
  </VictoryChart>
);

BestSellingSubCategoriesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        posts: PropTypes.number,
      })
    )
  ),
};

export default BestSellingSubCategoriesChart;
