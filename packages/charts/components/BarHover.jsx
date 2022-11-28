import PropTypes from 'prop-types';
import { Bar, LineSegment, VictoryTooltip } from 'victory';

const BarLine = ({ hover, ...props }) => (
  <>
    <Bar {...props} />
    {hover && (
      <LineSegment
        {...(props.horizontal
          ? {
              x1: props.x,
              x2: props.x,
              y1: props.y0,
              y2: 50,
            }
          : {
              x1: props.x0,
              x2: 400,
              y1: props.y,
              y2: props.y,
            })}
        style={{ pointerEvents: 'none' }}
      />
    )}
  </>
);

BarLine.propTypes = {
  hover: PropTypes.bool,
  ...Bar.propTypes,
};

BarLine.defaultProps = {
  hover: false,
};

const BarToolTip = ({ ...props }) => (
  <VictoryTooltip
    {...props}
    dx={props.horizontal ? -15 : 0}
    dy={props.horizontal ? 0 : 15}
    flyoutStyle={{ stroke: 'none', fill: 'none' }}
  />
);

BarToolTip.propTypes = VictoryTooltip.propTypes;

BarToolTip.defaultEvents = VictoryTooltip.defaultEvents;

const unfocus = {
  mutation: ({ style }) => ({ style: { ...style, fillOpacity: 0.2 } }),
};

const focus = {
  mutation: () => ({ hover: true }),
};

const reset = {
  mutation: () => null,
};

export { BarLine, BarToolTip, unfocus, focus, reset };
