import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import Title from '../Title';

const colors = ['#2563EB', '#497DEE', '#6D96F2', '#91B0F5'];

const mockData = [
  { company: 'A&G EQUIPMENT PTE.LTD.', posts: 32 },
  { company: 'ACE-WELD PTE.LTD.', posts: 25 },
  { company: 'FUJIN PTE.LTD.', posts: 26 },
  { company: 'HANWA SINGAPORE (PTE.)LTD.', posts: 23 },
];

const MostPostsBarChart = ({ data = mockData }) => (
  <VictoryChart domainPadding={50}>
    <Title text="Top 4 Companies With The Most Posts" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} />
    <VictoryAxis dependentAxis label="Posts" />
    <VictoryBar
      data={data}
      x="company"
      y="posts"
      style={{ data: { fill: (row) => colors[row.index] } }}
    />
    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} label="Company" />
  </VictoryChart>
);

MostPostsBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string,
      posts: PropTypes.number,
    })
  ),
};

export default MostPostsBarChart;
