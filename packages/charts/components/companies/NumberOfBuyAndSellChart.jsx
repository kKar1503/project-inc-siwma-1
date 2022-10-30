import { VictoryAxis, VictoryLine, VictoryChart, VictoryGroup } from 'victory';

const dataset = [
  [
    { month: new Date(0, 0, 1), posts: 5 },
    { month: new Date(0, 0, 4), posts: 25 },
    { month: new Date(0, 0, 6), posts: 15 },
    { month: new Date(0, 0, 9), posts: 30 },
    { month: new Date(0, 0, 11), posts: 25 },
    { month: new Date(0, 0, 12), posts: 35 },
  ],
  [
    { month: new Date(0, 0, 1), posts: 5 },
    { month: new Date(0, 0, 4), posts: 20 },
    { month: new Date(0, 0, 6), posts: 5 },
    { month: new Date(0, 0, 9), posts: 25 },
    { month: new Date(0, 0, 11), posts: 25 },
    { month: new Date(0, 0, 12), posts: 25 },
  ],
];

const NumberOfBuyAndSellChart = () => (
  <div>
    <VictoryChart domainPadding={20}>
      <VictoryGroup colorScale={['tomato', 'orange']}>
        {dataset.map((datas) => (
          <VictoryLine data={datas} x="month" y="posts" />
        ))}
      </VictoryGroup>

      <VictoryAxis
        style={{ tickLabels: { fontSize: 8 } }}
        tickFormat={(x) => x.toLocaleString('vn-vn', { month: 'short', day: 'numeric' })}
        label="Month"
      />
      <VictoryAxis dependentAxis tickCount={7} label="Companys" />
    </VictoryChart>
  </div>
);

export default NumberOfBuyAndSellChart;
