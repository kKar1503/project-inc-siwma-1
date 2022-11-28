import PropTypes from 'prop-types';
import { VictoryPie, VictoryContainer, VictoryLegend } from 'victory';
import Title from '../Title';

const colors = ['#2AB985', '#21986C', '#34D399', '#A5EBD2', '#1A7755', '#0F4733'];

// const data = [
//   { category: 'category1', post: 15 },
//   { category: 'category2', post: 10 },
//   { category: 'category3', post: 6 },
//   { category: 'category4', post: 4 },
//   { category: 'category5', post: 3 },
//   { category: 'category6', post: 2 },
// ];

const MostCommonCategoryChart = ({ data }) => (
  <VictoryContainer width={400} height={290}>
    <Title text="6 Most Common Categories By Listing" />
    <VictoryPie
      events={[
        {
          target: 'data',
          eventHandlers: {
            onMouseEnter: () => [
              {
                eventKey: 'all',
                target: 'data',
              },
            ],
          },
        },
      ]}
      padding={{ left: 50, bottom: 130, right: 50 }}
      radius={95}
      standalone={false}
      data={data}
      x="category"
      y="posts"
      colorScale={colors}
      labels={data.map(({ posts }) => posts)}
      style={{ labels: { fill: 'white', fontSize: 16 } }}
      labelRadius={({ innerRadius }) => innerRadius + 60}
    />
    <VictoryLegend
      standalone={false}
      itemsPerRow={2}
      gutter={50}
      x={45}
      y={240}
      colorScale={colors}
      data={data.map(({ category }) => ({ name: category, symbol: { type: 'square' } }))}
      style={{ labels: { fontSize: 10 } }}
    />
  </VictoryContainer>
);

MostCommonCategoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      posts: PropTypes.number,
    })
  ),
};

export default MostCommonCategoryChart;
