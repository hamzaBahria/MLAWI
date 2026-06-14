import type { MlawiComposition, Order } from '../types';

const HISTORY_KEY = 'mlawi_history';
const ORDER_KEY = 'mlawi_order';
const THEME_KEY = 'mlawi_theme';

export function getHistory(): MlawiComposition[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as MlawiComposition[]) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(mlawi: MlawiComposition): void {
  const history = getHistory();
  const updated = [mlawi, ...history].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function getCurrentOrder(): Order | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function saveOrder(order: Order): void {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

export function clearOrder(): void {
  localStorage.removeItem(ORDER_KEY);
}

export function getTheme(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return raw === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
}
