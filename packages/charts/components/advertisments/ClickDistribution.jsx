import { VictoryPie, VictoryContainer, VictoryLegend, VictoryLabel } from 'victory';
import PropType from 'prop-types';
import { limit } from '../../utils/format';

const colors = ['#1C1917', '#F43F5E', '#34D399', '#2563EB', '#FACC15'];

const ClickDistribution = ({ dataset }) => {
  const sum = () => {
    let total = 0;
    for (let i = 0; i < dataset.length; i++) {
      total += dataset[i].clicks;
    }
    return total;
  };
  return (
    <VictoryContainer width={600} height={300}>
      <VictoryPie
        padding={{ left: 500, bottom: 100 }}
        radius={120}
        standalone={false}
        data={dataset}
        x="name"
        y="clicks"
        colorScale={colors}
        innerRadius={140}
        labelRadius={120}
        style={{ labels: { fontSize: 0 } }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 110, fontWeight: 'bold' }}
        x={450}
        y={140}
        text={sum()}
      />
      <VictoryLabel textAnchor="middle" style={{ fontSize: 30 }} x={450} y={200} text="Clicks" />
      <VictoryLegend
        standalone={false}
        itemsPerRow={5}
        gutter={80}
        x={20}
        y={50}
        colorScale={colors}
        data={dataset.map(({ name }) => ({ name: limit(name, 25), symbol: { type: 'square' } }))}
        style={{
          data: { stroke: ({ index }) => colors[index], strokeWidth: 10 },
          labels: { fontSize: 16 },
        }}
      />
    </VictoryContainer>
  );
};

ClickDistribution.propTypes = {
  dataset: PropType.arrayOf(
    PropType.shape({
      name: PropType.string.isRequired,
      clicks: PropType.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ClickDistribution;
