import PropTypes from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

const MostPostsBarChart = ({ data }) => (
  <VictoryChart domainPadding={20}>
    <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} />
    <VictoryAxis dependentAxis />
    <VictoryBar data={data} x="company" y="posts" />
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
