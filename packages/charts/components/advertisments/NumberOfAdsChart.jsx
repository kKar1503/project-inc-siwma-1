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

const NumberOfAdsCharts = () => (
  <VictoryChart domainPadding={20}>
    <VictoryBar
      data={dataset}
      x="month"
      y="ad_space"
      style={{
        data: { fill: ({ datum }) => (datum.month === month ? '#F43F5E' : 'lightgrey') },
        labels: { fill: ({ datum }) => (datum.month === month ? 'white' : 'black') },
      }}
      labels={({ datum }) => datum.ad_space}
      barWidth={20}
      labelComponent={<VictoryLabel y={242} angle={-90} lineHeight="-1.5" textAnchor="start" />}
      dataComponent={
        <Bar cornerRadius={{ topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 }} />
      }
    />
    <VictoryAxis tickValues={ticks} style={{ axis: { stroke: 'none' } }} />
  </VictoryChart>
);

export default NumberOfAdsCharts;
