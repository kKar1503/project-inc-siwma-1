import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from 'victory';
import { BarLine, BarToolTip, focus, reset, unfocus } from '../BarHover';
import Title from '../Title';

const colors = ['#2563EB', '#6D96F2', '#91B0F5'];

const mockData = [
  {
    shape: 'Bars',
    posts: [
      { category: 'Mild Steel', posts: 32 },
      { category: 'Stainless Steel', posts: 3 },
      { category: 'Bronze', posts: 16 },
      { category: 'Brass', posts: 18 },
    ],
  },
  {
    shape: 'Plates',
    posts: [
      { category: 'Mild Steel', posts: 24 },
      { category: 'Stainless Steel', posts: 10 },
      { category: 'Bronze', posts: 25 },
      { category: 'Brass', posts: 28 },
    ],
  },
  {
    shape: 'Hollow Section',
    posts: [
      { category: 'Mild Steel', posts: 8 },
      { category: 'Stainless Steel', posts: 8 },
      { category: 'Bronze', posts: 8 },
      { category: 'Brass', posts: 13 },
    ],
  },
];

const TopSellingPostChart = () => {
  const shapes = mockData.map(({ shape }) => shape);
  return (
    <VictoryChart domainPadding={50}>
      <Title text="Top 3 Selling Posts By Shape" />
      <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
      <VictoryAxis dependentAxis label="Posts" />
      <VictoryGroup
        offset={15}
        colorScale={colors}
        events={[
          {
            childName: shapes,
            target: 'data',
            eventHandlers: {
              onMouseEnter: () => [
                {
                  childName: shapes,
                  eventKey: 'all',
                  ...unfocus,
                },
                focus,
              ],
              onMouseLeave: () => [
                {
                  childName: shapes,
                  eventKey: 'all',
                  ...reset,
                },
              ],
            },
          },
        ]}
      >
        {mockData.map(({ shape, posts }) => (
          <VictoryBar
            key={shape}
            name={shape}
            data={posts}
            dataComponent={<BarLine />}
            labels={posts.map(({ posts: v }) => v)}
            labelComponent={<BarToolTip />}
            x="category"
            y="posts"
          />
        ))}
      </VictoryGroup>
      <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Company" />
      <VictoryLegend
        x={320}
        y={10}
        rowGutter={-12}
        data={mockData.map((data) => ({ name: data.shape, symbol: { type: 'square' } }))}
        colorScale={colors}
      />
    </VictoryChart>
  );
};

export default TopSellingPostChart;
