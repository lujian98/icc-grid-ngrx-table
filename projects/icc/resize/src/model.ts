export interface IccResizeInfo {
  direction: string;
  element: HTMLDivElement;
  isResized: boolean;
  origin: string | null;
  width: number;
  height: number;
  dx: number;
  dy: number;
  scaleX: number;
  scaleY: number;
  signX: number;
  signY: number;
}
