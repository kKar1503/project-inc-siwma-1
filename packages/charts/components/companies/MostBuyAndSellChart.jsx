import { VictoryAxis, VictoryStack, VictoryBar, VictoryChart } from 'victory';
import Title from '../Title';

const dataset = [
  { company: 'A&G EQUIPMENT PTE.LTD.', buy: 17, sell: 16 },
  { company: 'ACE-WELD PTE.LTD.', buy: 10, sell: 5 },
  { company: 'FUJIN PTE.LTD.', buy: 5, sell: 10 },
  { company: 'HANWA SINGAPORE (PTE.)LTD.', buy: 7, sell: 6 },
];

const MostBuyAndSellStackChart = () => (
  <VictoryChart domainPadding={20}>
    <Title text={['Top 4 Companies Who', 'Buy And Sell The Most In 2022']} />
    <VictoryAxis dependentAxis tickCount={7} label="Posts" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryStack colorScale={['#6D96F2', '#2563EB']}>
      <VictoryBar data={dataset} x="company" y="buy" />
      <VictoryBar data={dataset} x="company" y="sell" />
    </VictoryStack>

    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Company" />
  </VictoryChart>
);

export default MostBuyAndSellStackChart;
