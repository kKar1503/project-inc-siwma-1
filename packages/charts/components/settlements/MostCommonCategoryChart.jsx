import { VictoryPie, VictoryContainer, VictoryLegend } from 'victory';
import Title from '../Title';

const colors = ['#2AB985', '#21986C', '#34D399', '#A5EBD2', '#1A7755', '#0F4733'];

const dataset = [
  { cat: 'cat1', post: 15 },
  { cat: 'cat2', post: 10 },
  { cat: 'cat3', post: 6 },
  { cat: 'cat4', post: 4 },
  { cat: 'cat5', post: 3 },
  { cat: 'cat6', post: 2 },
];

const MostCommonCategoryChart = () => (
  <VictoryContainer width={400} height={290}>
    <Title text="Most Common Category In $/kg" />
    <VictoryPie
      padding={{ left: 50, bottom: 130, right: 50 }}
      radius={95}
      standalone={false}
      data={dataset}
      x="cat"
      y="post"
      colorScale={colors}
      labels={({ datum }) => datum.post}
      style={{ labels: { fill: 'white', fontSize: 16 } }}
      labelRadius={({ innerRadius }) => innerRadius + 60}
    />
    <VictoryLegend
      standalone={false}
      itemsPerRow={2}
      gutter={80}
      x={45}
      y={230}
      colorScale={colors}
      data={dataset.map(({ cat }) => ({ name: cat, symbol: { type: 'square' } }))}
    />
  </VictoryContainer>
);

export default MostCommonCategoryChart;
