import { VictoryPie, VictoryContainer, VictoryLegend, VictoryLabel } from 'victory';

const colors = ['#1C1917', '#F43F5E', '#34D399', '#2563EB', '#FACC15'];

const dataset = [
  { cat: 'SHI LI FANG IRON...', post: 5 },
  { cat: 'SHI LI FANG IRON...', post: 15 },
  { cat: 'SHI LI FANG IRON...', post: 15 },
  { cat: 'SHI LI FANG IRON...', post: 5 },
  { cat: 'SHI LI FANG IRON...', post: 10 },
];

const ClickDistribution = () => (
  <VictoryContainer width={435} height={290}>
    <VictoryPie
      padding={{ left: 215, bottom: 100 }}
      radius={100}
      standalone={false}
      data={dataset}
      x="cat"
      y="post"
      colorScale={colors}
      innerRadius={120}
      labelRadius={100}
      style={{ labels: { fontSize: 0 } }}
    />
    <VictoryLabel
      textAnchor="middle"
      style={{ fontSize: 110, fontWeight: 'bold' }}
      x={310}
      y={140}
      text="25"
    />
    <VictoryLabel textAnchor="middle" style={{ fontSize: 30 }} x={310} y={200} text="Clicks" />
    <VictoryLegend
      standalone={false}
      itemsPerRow={5}
      gutter={80}
      x={0}
      y={70}
      colorScale={colors}
      data={dataset.map(({ cat }) => ({ name: cat, symbol: { type: 'square' } }))}
      style={{
        data: { stroke: ({ index }) => colors[index], strokeWidth: 10 },
        labels: { fontSize: 16 },
      }}
    />
  </VictoryContainer>
);

export default ClickDistribution;
