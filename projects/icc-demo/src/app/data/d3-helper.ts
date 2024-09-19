import { IccD3ChartConfig, IccD3Options, IccD3Component, defaultD3Config } from '@icc/ui/d3';

const options: IccD3Options = {
  margin: { top: 50, right: 80, bottom: 10, left: 10 },
};

export const RemoteD3Config = {
  // only partial do not use default
  options: { ...options },
};

export const RemoteChartConfigs: IccD3ChartConfig[] = [
  {
    chartType: 'lineChart',
    xScaleType: 'linear',
    useInteractiveGuideline: true,
    x0: (d: any) => d.key,
    y0: (d: any) => d.values,
    drawColor: (d: any, i: number) => d.key,
    xAxis: {
      axisLabel: 'Time (ms)',
      textAnchor: 'end',
    },
    yAxis: {
      axisLabel: 'Voltage (v)',
      textAnchor: 'end',
      rotate: -90,
      axisLabelDistance: -40,
    },
    zoom: {
      enabled: true,
      horizontalOff: true,
      horizontalBrushShow: false,
      verticalOff: false,
      verticalBrushShow: true,
    },
  },
  {
    chartType: 'areaChart',
  },
];

export const RemoteD3Data = getData();

function getData(): any[] {
  const sin = [];
  const sin2 = [];
  const cos = [];
  for (let i = 0; i < 100; i++) {
    sin.push({ x: i, y: Math.sin(i / 10) });
    sin2.push({ x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
    cos.push({ x: i, y: 0.5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
  }
  return [
    {
      values: sin, // values - represents the array of {x,y} data points
      key: 'Sine Wave', // key  - the name of the series.
      color: '#ff7f0e', // color - optional: choose your own line color.
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      chartType: 'areaChart', // area - set to true if you want this line to turn into a filled area chart.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c',
    },
  ];
}
