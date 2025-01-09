import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccD3ChartConfig, IccD3Options, IccD3Component, defaultD3Config } from '@icc/ui/d3';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'app-historical-bar-chart',
  styles: [':host {width: 100%; height: 100%; display: flex; flex-direction: column;}'],
  template: `
    <icc-d3 [d3Config]="d3Config" [chartConfigs]="chartConfigs" [data]="data"></icc-d3>
    <icc-d3 [chartConfigs]="chartConfigs2" [data]="data2"></icc-d3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccD3Component],
})
export class AppHistoricalBarChartComponent implements OnInit {
  options: IccD3Options = {
    margin: { right: 50 },
  };
  d3Config = {
    ...defaultD3Config,
    options: { ...this.options },
  };
  chartConfigs: IccD3ChartConfig[] = [
    {
      // chartType: 'lineChart',
      chartType: 'barChart',
      xScaleType: 'time',
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      x: (d: any) => d[0],
      y: (d: any) => d[1],
      drawColor: (d: any, i: any) => d.key,
      duration: 1000,
      popover: {
        axisFormatter: (d: any) => d3TimeFormat.timeFormat('%x')(new Date(d)),
        valueFormatter: (d: any) => d3Format.format(',.0f')(d),
      },
    },
  ];

  chartConfigs2: IccD3ChartConfig[] = [
    {
      chartType: 'barChart',
      xScaleType: 'linear',
      x0: (d: any) => d.key,
      y0: (d: any) => d.values,
      x: (d: any) => d.x,
      y: (d: any) => d.y,
      duration: 1000,
      zoom: {
        enabled: true,
        horizontalOff: false,
        horizontalBrushShow: true,
        verticalOff: true,
        verticalBrushShow: true,
      },
    },
  ];

  data = [
    {
      key: 'Quantity',
      color: 'green',
      // bar: true,
      values: [
        [1136005200000, 1271000.0],
        [1138683600000, 1271000.0],
        [1141102800000, 1271000.0],
        [1143781200000, 0],
        [1146369600000, 0],
        [1149048000000, 0],
        [1151640000000, 0],
        [1154318400000, 0],
        [1156996800000, 0],
        [1159588800000, 3899486.0],
        [1162270800000, 3899486.0],
        [1164862800000, 3899486.0],
        [1167541200000, 3564700.0],
        [1170219600000, 3564700.0],
        [1172638800000, 3564700.0],
        [1175313600000, 2648493.0],
        [1177905600000, 2648493.0],
        [1180584000000, 2648493.0],
        [1183176000000, 2522993.0],
        [1185854400000, 2522993.0],
        [1188532800000, 2522993.0],
        [1191124800000, 2906501.0],
        [1193803200000, 2906501.0],
        [1196398800000, 2906501.0],
        [1199077200000, 2206761.0],
        [1201755600000, 2206761.0],
        [1204261200000, 2206761.0],
        [1206936000000, 2287726.0],
        [1209528000000, 2287726.0],
        [1212206400000, 2287726.0],
        [1214798400000, 2732646.0],
        [1217476800000, 2732646.0],
        [1220155200000, 2732646.0],
        [1222747200000, 2599196.0],
        [1225425600000, 2599196.0],
        [1228021200000, 2599196.0],
        [1230699600000, 1924387.0],
        [1233378000000, 1924387.0],
        [1235797200000, 1924387.0],
        [1238472000000, 1756311.0],
        [1241064000000, 1756311.0],
        [1243742400000, 1756311.0],
        [1246334400000, 1743470.0],
        [1249012800000, 1743470.0],
        [1251691200000, 1743470.0],
        [1254283200000, 1519010.0],
        [1256961600000, 1519010.0],
        [1259557200000, 1519010.0],
        [1262235600000, 1591444.0],
        [1264914000000, 1591444.0],
        [1267333200000, 1591444.0],
        [1270008000000, 1543784.0],
        [1272600000000, 1543784.0],
        [1275278400000, 1543784.0],
        [1277870400000, 1309915.0],
        [1280548800000, 1309915.0],
        [1283227200000, 1309915.0],
        [1285819200000, 1331875.0],
        [1288497600000, 1331875.0],
        [1291093200000, 1331875.0],
        [1293771600000, 1331875.0],
        [1296450000000, 1154695.0],
        [1298869200000, 1154695.0],
        [1301544000000, 1194025.0],
        [1304136000000, 1194025.0],
        [1306814400000, 1194025.0],
        [1309406400000, 1194025.0],
        [1312084800000, 1194025.0],
        [1314763200000, 1244525.0],
        [1317355200000, 475000.0],
        [1320033600000, 475000.0],
        [1322629200000, 475000.0],
        [1325307600000, 690033.0],
        [1327986000000, 690033.0],
        [1330491600000, 690033.0],
        [1333166400000, 514733.0],
        [1335758400000, 514733.0],
      ],
    },
  ];

  data2!: any[];
  ngOnInit() {
    this.data[0].values.forEach((d: any) => {
      d[0] = new Date(d[0]);
    });

    console.log(' data =', this.data);
    this.data2 = this.getData();
    console.log(' ndata =', this.data2);
  }

  private getData() {
    return this.stream_layers(1, 50 + Math.random() * 50, 0.1).map((data, i) => {
      return { key: 'Stream' + i, values: data };
    });
  }

  stream_layers(n: any, m: any, o: any) {
    if (arguments.length < 3) {
      o = 0;
    }
    return d3Array.range(n).map(() => {
      const a = [];
      for (let i = 0; i < m; i++) {
        a[i] = o + o * Math.random();
      }
      for (let i = 0; i < 5; i++) {
        this.bump(a, m);
      }
      return a.map((d, index) => {
        return { x: index, y: Math.max(0, d) };
      });
    });
  }

  private bump(a: any, m: any) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    for (let i = 0; i < m; i++) {
      const w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
}
