import PropTypes from 'prop-types';
import { VictoryAxis, VictoryStack, VictoryBar, VictoryChart } from 'victory';
import { BarLine, BarToolTip, focus, reset, unfocus } from '../BarHover';
import Title from '../Title';

// const dataset = [
//   { company: 'A&G EQUIPMENT PTE.LTD.', buy: 17, sell: 16 },
//   { company: 'ACE-WELD PTE.LTD.', buy: 10, sell: 5 },
//   { company: 'FUJIN PTE.LTD.', buy: 5, sell: 10 },
//   { company: 'HANWA SINGAPORE (PTE.)LTD.', buy: 7, sell: 6 },
// ];

const bars = ['buy', 'sell'];

const MostBuyAndSellChart = ({ data }) => (
  <VictoryChart domainPadding={50}>
    <Title text={['Top 4 Companies Who', 'Buy And Sell The Most In 2022']} />
    <VictoryAxis dependentAxis tickCount={7} label="Posts" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryStack
      colorScale={['#6D96F2', '#2563EB']}
      events={[
        {
          childName: 'buy',
          target: 'data',
          eventHandlers: {
            onMouseEnter: () => [
              {
                childName: bars,
                eventKey: 'all',
                ...unfocus,
              },
              focus,
            ],
          },
        },
        {
          childName: ['sell'],
          target: 'data',
          eventHandlers: {
            onMouseEnter: () => [
              {
                childName: bars,
                eventKey: 'all',
                ...unfocus,
              },
              {
                childName: bars,
                ...reset,
              },
              focus,
            ],
          },
        },
        {
          childName: bars,
          target: 'data',
          eventHandlers: {
            onMouseLeave: () => [
              {
                childName: bars,
                eventKey: 'all',
                ...reset,
              },
            ],
          },
        },
      ]}
    >
      <VictoryBar
        name="buy"
        data={data}
        dataComponent={<BarLine />}
        style={{ data: data.length === 1 && { width: 30 } }}
        labels={data.map(({ buy }) => buy)}
        labelComponent={<BarToolTip />}
        x="company"
        y="buy"
      />
      <VictoryBar
        name="sell"
        data={data}
        dataComponent={<BarLine />}
        style={{ data: data.length === 1 && { width: 30 } }}
        labels={data.map(({ buy, sell }) => buy + sell)}
        labelComponent={<BarToolTip />}
        x="company"
        y="sell"
      />
    </VictoryStack>

    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Company" />
  </VictoryChart>
);

MostBuyAndSellChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      buy: PropTypes.number,
      sell: PropTypes.number,
    })
  ),
};

export default MostBuyAndSellChart;
