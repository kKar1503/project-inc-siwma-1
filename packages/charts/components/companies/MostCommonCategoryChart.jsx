import { VictoryAxis, VictoryPie, VictoryChart } from 'victory';

const dataset = [
  { cat: 'cat5', post: 2 },
  { cat: 'cat4', post: 3 },
  { cat: 'cat2', post: 4 },
  { cat: 'cat6', post: 6 },
  { cat: 'cat1', post: 10 },
  { cat: 'cat3', post: 15 },
];

const MostCommonCategoryChart = () => (
  <div>
    <VictoryPie
      data={dataset}
      x="cat"
      y="post"
      colorScale={['#2AB985', '#21986C', '#34D399', '#A5EBD2', '#1A7755', '#0F4733']}
      labels={({ datum }) => datum.post}
      style={{ labels: { fill: 'white', fontSize: 20 } }}
      labelRadius={({ innerRadius }) => innerRadius + 80}
    />
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      {dataset.map((cat) => (
        <p className="">{cat.cat}</p>
      ))}
    </div>
  </div>
);

export default MostCommonCategoryChart;
