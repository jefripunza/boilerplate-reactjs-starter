import React from 'react';
import PropTypes from 'prop-types';
import { Sparklines, SparklinesCurve, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';

class SparkLine extends React.PureComponent {
  render() {
    let { width, height, color, data } = this.props;
    color = color ?? '#253e56';

    return (
      <Sparklines data={data} width={width} height={height} style={{}}>
        <SparklinesCurve color={color} />
        <SparklinesSpots style={{ fill: color }} />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
    );
  }
}

SparkLine.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  data: PropTypes.array,
};

export default SparkLine;
