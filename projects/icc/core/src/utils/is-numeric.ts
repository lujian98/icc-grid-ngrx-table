export function isNumeric(val: string | number | undefined): boolean {
  if (typeof val === 'number') return true;
  else if (typeof val === 'string') {
    return !isNaN(val as any) && !isNaN(parseFloat(val as any));
  } else {
    return false;
  }
}
