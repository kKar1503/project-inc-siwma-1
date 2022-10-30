import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryClipContainer,
} from 'victory';
import { DateTime } from 'luxon';
import Title from '../Title';

const colors = ['orange', 'tomato'];

const year = 2021;
const dataset = [
  { month: new Date(year, 0), buy: 5, sell: 5 },
  { month: new Date(year, 3), buy: 25, sell: 20 },
  { month: new Date(year, 6), buy: 15, sell: 5 },
  { month: new Date(year, 8), buy: 30, sell: 25 },
  { month: new Date(year, 10), buy: 25, sell: 25 },
  { month: new Date(year, 11), buy: 35, sell: 35 },
];

const NumberOfBuyAndSellChart = () => (
  <VictoryChart domainPadding={{ y: [20, 20] }}>
    <Title text="Number Of Companies Buying And Selling" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} />
    <VictoryGroup colorScale={colors}>
      <VictoryLine
        data={dataset}
        x="month"
        y="sell"
        groupComponent={<VictoryClipContainer clipId={0} />}
      />
      <VictoryLine
        data={dataset}
        x="month"
        y="buy"
        groupComponent={<VictoryClipContainer clipId={1} />}
      />
    </VictoryGroup>
    <VictoryAxis
      style={{ tickLabels: { fontSize: 8 } }}
      tickFormat={(date) => DateTime.fromMillis(date).toFormat('MMM')}
      tickValues={Array(12)
        .fill()
        .map((_, i) => DateTime.fromObject({ year, month: i + 1 }).toMillis())}
      label="Month"
    />
    <VictoryAxis dependentAxis tickCount={7} label="Companies" />
  </VictoryChart>
);

export default NumberOfBuyAndSellChart;
