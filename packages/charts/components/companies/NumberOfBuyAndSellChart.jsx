import PropTypes from 'prop-types';
import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryClipContainer,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLegend,
} from 'victory';
import { useId } from 'react';
import Title from '../Title';

const colors = ['orange', 'tomato'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const dataset = [
//   { month: new Date(year, 0), buy: 5, sell: 5 },
//   { month: new Date(year, 3), buy: 25, sell: 20 },
//   { month: new Date(year, 6), buy: 15, sell: 5 },
//   { month: new Date(year, 8), buy: 30, sell: 25 },
//   { month: new Date(year, 10), buy: 25, sell: 25 },
//   { month: new Date(year, 11), buy: 35, sell: 35 },
// ];

const y = '_y';
const Hover = ({ text: [line], ...props }) => (
  <VictoryTooltip {...props} pointerLength={0} text={line} />
);
Hover.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

const NumberOfBuyAndSellChart = ({ data }) => {
  const sellId = useId();
  const buyId = useId();
  return (
    <VictoryChart
      domainPadding={{ y: [50, 50] }}
      containerComponent={
        <VictoryVoronoiContainer
          mouseFollowTooltips
          radius={50}
          labels={({ datum }) => datum[y]}
          labelComponent={<Hover />}
        />
      }
    >
      <Title text="Number Of Companies Buying And Selling" />
      <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
      <VictoryGroup colorScale={colors}>
        <VictoryLine
          data={data}
          x="month"
          y="sell"
          groupComponent={<VictoryClipContainer clipId={sellId} />}
        />
        <VictoryLine
          data={data}
          x="month"
          y="buy"
          groupComponent={<VictoryClipContainer clipId={buyId} />}
        />
      </VictoryGroup>
      <VictoryAxis
        style={{ tickLabels: { fontSize: 12 } }}
        tickFormat={(i) => months[i - 1]}
        tickValues={Array(12)
          .fill()
          .map((_, i) => i + 1)}
        label="Month"
      />
      <VictoryAxis dependentAxis tickCount={7} label="Companies" />
      <VictoryLegend
        x={275}
        y={40}
        orientation="horizontal"
        data={['Sell', 'Buy'].map((name) => ({ name, symbol: { type: 'square' } }))}
        colorScale={colors}
      />
    </VictoryChart>
  );
};

NumberOfBuyAndSellChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number,
      buy: PropTypes.number,
      sell: PropTypes.number,
    })
  ),
};

export default NumberOfBuyAndSellChart;
