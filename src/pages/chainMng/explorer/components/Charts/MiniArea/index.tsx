import { Axis, Chart, Geom, Tooltip, AxisProps } from 'bizcharts';

import React from 'react';
import autoHeight from '../autoHeight';
import styles from '../index.less';

export interface MiniAreaProps {
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: AxisProps;
  forceFit?: boolean;
  scale?: {
    x?: {
      tickCount: number;
    };
    y?: {
      tickCount: number;
    };
  };
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: {
    x: number | string;
    y: number;
  }[];
}

const MiniArea: React.FC<MiniAreaProps> = (props) => {
  const {
    height = 1,
    data = [],
    forceFit = true,
    color = 'rgba(24, 144, 255, 0.2)',
    borderColor = '#1089ff',
    scale = { x: {}, y: {} },
    borderWidth = 0.5,
    line,
    xAxis,
    yAxis,
    animate = true,
  } = props;

  const padding: [number, number, number, number] = [20, 5, 30, 5];

  const scaleProps = {
    x: {
      type : "time",
      range: [0, 1],
      ...scale.x,
    },
    y: {
      min: 0,
      ...scale.y,
    },
  };

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  const chartHeight = height + 54;

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <Chart
            animate={animate}
            scale={scaleProps}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
          >
            <Axis
              key="axis-x"
              name="x"
              label={null}
            />
            <Axis
              key="axis-y"
              name="y"
              label={null}
            />
            <Tooltip  />
            <Geom
              type="line"
              position="x*y"
              color={borderColor}
              size={borderWidth}
              tooltip={false}
            />
            <Geom
              type="area"
              position="x*y"
              color={color}
              tooltip={tooltip}
              opacity={0.2}
            />
            
            
          </Chart>
        )}
      </div>
    </div>
  );
};

export default autoHeight()(MiniArea);
