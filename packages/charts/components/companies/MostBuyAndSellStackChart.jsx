import { VictoryAxis, VictoryStack, VictoryBar, VictoryChart } from 'victory';

const dataset = [
  [
    { company: 'A&G EQUIPMENT PTE.LTD.', posts: 17 },
    { company: 'ACE-WELD PTE.LTD.', posts: 10 },
    { company: 'FUJIN PTE.LTD.', posts: 5 },
    { company: 'HANWA SINGAPORE (PTE.)LTD.', posts: 7 },
  ],
  [
    { company: 'A&G EQUIPMENT PTE.LTD.', posts: 16 },
    { company: 'ACE-WELD PTE.LTD.', posts: 5 },
    { company: 'FUJIN PTE.LTD.', posts: 10 },
    { company: 'HANWA SINGAPORE (PTE.)LTD.', posts: 6 },
  ],
];

const MostBuyAndSellStackChart = () => (
  <div>
    <VictoryChart domainPadding={20}>
      <VictoryStack colorScale={['#6D96F2', '#2563EB']}>
        {dataset.map((datas) => (
          <VictoryBar data={datas} x="company" y="posts" />
        ))}
      </VictoryStack>
      <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Companys" />
      <VictoryAxis dependentAxis tickCount={7} label="Posts" />
    </VictoryChart>
  </div>
);

export default MostBuyAndSellStackChart;
