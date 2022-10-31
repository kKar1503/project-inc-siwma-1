import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, Bar } from 'victory';
// import { DateTime } from 'luxon';

const dataset = [{ month: 'Jan', buy: 5, sell: 5 }];
const NumberOfAdsCharts = () => (
  <VictoryChart>
    <VictoryBar
      data={dataset}
      // labels={({ data }) => data._y}
      barWidth={40}
      labelComponent={<VictoryLabel y={335} angle={-90} lineHeight={-1.5} textAnchor="start" />}
      dataComponent={
        <Bar cornerRadius={{ topLeft: 20, topRight: 20, bottomLeft: 20, bottomRight: 20 }} />
      }
    />
  </VictoryChart>
);

export default NumberOfAdsCharts;
