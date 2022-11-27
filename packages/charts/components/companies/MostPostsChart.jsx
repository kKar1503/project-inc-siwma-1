import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import Title from '../Title';
import { BarLine, BarToolTip, focus, reset, unfocus } from '../BarHover';

const colors = ['#2563EB', '#497DEE', '#6D96F2', '#91B0F5'];

// const mockData = [
//   { company: 'A&G EQUIPMENT PTE.LTD.', posts: 32 },
//   { company: 'ACE-WELD PTE.LTD.', posts: 25 },
//   { company: 'FUJIN PTE.LTD.', posts: 26 },
//   { company: 'HANWA SINGAPORE (PTE.)LTD.', posts: 23 },
// ];

const MostPostsBarChart = ({ data }) => (
  <VictoryChart domainPadding={50}>
    <Title text="Top 4 Companies With The Most Posts" />
    <VictoryAxis dependentAxis style={{ grid: { stroke: '#DADADA' } }} tickCount={7} />
    <VictoryAxis dependentAxis label="Posts" tickCount={7} />
    <VictoryBar
      labels={data.map(({ posts }) => posts)}
      labelComponent={<BarToolTip />}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onMouseEnter: () => [
              {
                eventKey: 'all',
                ...unfocus,
              },
              focus,
            ],
            onMouseLeave: () => [
              {
                eventKey: 'all',
                ...reset,
              },
            ],
          },
        },
      ]}
      data={data}
      dataComponent={<BarLine />}
      x="company"
      y="posts"
      style={{
        data: { fill: (row) => colors[row.index], ...(data.length === 1 && { width: 30 }) },
      }}
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
