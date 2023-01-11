import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, Bar } from 'victory';
import PropType from 'prop-types';

const ticks = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const tick2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const d = new Date();
const month = (d.getMonth() + 1 ).toString();
const width = 35;

const NumberOfAdsCharts = ({ dataset }) => (
  <VictoryChart
    domainPadding={0}
    padding={{ top: 10, left: 30, right: 30, bottom: 50 }}
    width={600}
    height={300}
  >
    <VictoryBar
      data={dataset}
      x={tick2}
      y="clicks"
      style={{
        data: { fill: ({ datum }) => (datum.month === month ? '#F43F5E' : 'lightgrey') },
        labels: {
          fill: ({ datum }) => (datum.month === month ? 'white' : 'black'),
          fontSize: 17,
          fontWeight: 500,
        },
      }}
      labels={({ datum }) => datum.clicks}
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
      tickValues={Array(12)
        .fill()
        .map((_, i) => i)}
      tickFormat={(i) => ticks[i]}
      style={{ axis: { stroke: 'none' }, tickLabels: { fontSize: 20 } }}
    />
  </VictoryChart>
);

NumberOfAdsCharts.propTypes = {
  dataset: PropType.arrayOf(
    PropType.shape({
      month: PropType.string.isRequired,
      clicks: PropType.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default NumberOfAdsCharts;
