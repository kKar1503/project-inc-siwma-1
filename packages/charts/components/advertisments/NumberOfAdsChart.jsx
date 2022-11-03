import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, Bar } from 'victory';

const dataset = [
  { month: 'Jan', ad_space: 5 },
  { month: 'Feb', ad_space: 1 },
  { month: 'Mar', ad_space: 2 },
  { month: 'Apr', ad_space: 4 },
  { month: 'May', ad_space: 4 },
  { month: 'Jun', ad_space: 1 },
  { month: 'Jul', ad_space: 4 },
  { month: 'Aug', ad_space: 1 },
  { month: 'Sep', ad_space: 3 },
  { month: 'Oct', ad_space: 4 },
];

const ticks = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const month = 'Oct';
const width = 35;

const NumberOfAdsCharts = () => (
  <VictoryChart
    domainPadding={0}
    padding={{ top: 10, left: 30, right: 30, bottom: 50 }}
    width={600}
    height={300}
  >
    <VictoryBar
      data={dataset}
      x="month"
      y="ad_space"
      style={{
        data: { fill: ({ datum }) => (datum.month === month ? '#F43F5E' : 'lightgrey') },
        labels: {
          fill: ({ datum }) => (datum.month === month ? 'white' : 'black'),
          fontSize: 17,
          fontWeight: 500,
        },
      }}
      labels={({ datum }) => datum.ad_space}
      barWidth={width}
      labelComponent={<VictoryLabel y={236} angle={-90} lineHeight="-1.1" textAnchor="start" />}
      dataComponent={
        <Bar
          cornerRadius={{
            topLeft: width / 2,
            topRight: width / 2,
            bottomLeft: width / 2,
            bottomRight: width / 2,
          }}
        />
      }
    />
    <VictoryAxis
      tickValues={ticks}
      style={{ axis: { stroke: 'none' }, tickLabels: { fontSize: 20 } }}
    />
  </VictoryChart>
);

export default NumberOfAdsCharts;
