import { IccDashboardConfig, IccDashboardSetting } from '../models/dashboard.model';

export function initGridMap(config: IccDashboardConfig): number[][] {
  const gridMap: number[][] = [];
  for (let i = 0; i < config.rows; i++) {
    gridMap[i] = [];
    for (let j = 0; j < config.cols; j++) {
      gridMap[i][j] = -1;
    }
  }
  return gridMap;
}

export function viewportConfig(config: IccDashboardConfig, width: number, height: number): IccDashboardConfig {
  const gridWidth = (width - config.cols * config.gridGap - 4) / config.cols;
  const gridHeight = (height - config.cols * config.gridGap - 4) / config.rows;
  if (gridWidth !== config.gridWidth || gridHeight !== config.gridHeight) {
    return { ...config, gridWidth, gridHeight };
  }
  return config;
}

export function viewportSetting(
  dashboardConfig: IccDashboardConfig,
  setting: IccDashboardSetting,
): IccDashboardSetting {
  return {
    ...setting,
    gridTemplateColumns: `repeat(${dashboardConfig.cols}, ${dashboardConfig.gridWidth}px)`,
    gridTemplateRows: `repeat(${dashboardConfig.rows}, ${dashboardConfig.gridHeight}px)`,
  };
}
