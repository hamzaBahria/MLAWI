export function vibrate(pattern: number | number[] = 30): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

export function vibrateSuccess(): void {
  vibrate([20, 30, 20]);
}

export function vibrateLight(): void {
  vibrate(15);
}
