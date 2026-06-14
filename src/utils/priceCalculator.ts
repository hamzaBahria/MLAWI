import type { SupplementSelection } from '../types';
import { getSupplementById } from '../data/supplements';

/**
 * Check if a selection contains a specific supplement with at least `minQty`
 */
function has(selections: SupplementSelection[], id: string, minQty = 1): boolean {
  const sel = selections.find((s) => s.supplementId === id);
  return (sel?.quantity ?? 0) >= minQty;
}

function getQty(selections: SupplementSelection[], id: string): number {
  return selections.find((s) => s.supplementId === id)?.quantity ?? 0;
}

/**
 * "Double Patte" = patte quantity >= 2 (1 base + 1 added)
 */
function isDoublePatte(selections: SupplementSelection[]): boolean {
  return getQty(selections, 'patte') >= 2;
}

/**
 * Special combo rules (returns fixed price or null)
 */
function getComboPrice(selections: SupplementSelection[]): number | null {
  if (!isDoublePatte(selections)) return null;
  if (!has(selections, '3adhma') || !has(selections, 'mozzarella')) return null;

  const combos: Record<string, number> = {
    kwika: 4.0,
    thon: 4.5,
    jambon: 3.7,
    salami: 3.5,
    scalope: 6.0,
    merguez: 6.0,
    melange: 5.5,
  };

  for (const [id, price] of Object.entries(combos)) {
    if (has(selections, id)) return price;
  }

  return null;
}

/**
 * Dynamic price for "Patte":
 * - If total without patte < 3 DT → patte = 0.7 DT
 * - If total without patte >= 3 DT → patte = 0.5 DT
 *
 * We compute base total (without patte) first, then apply patte price.
 */
function computePattePrice(baseTotalWithoutPatte: number): number {
  return baseTotalWithoutPatte < 3 ? 0.7 : 0.5;
}

/**
 * Main calculation entry point
 */
export function calculateTotal(selections: SupplementSelection[]): number {
  // Check combo first
  const comboPrice = getComboPrice(selections);
  if (comboPrice !== null) return comboPrice;

  // Calculate base total without patte
  let baseTotal = 0;
  for (const sel of selections) {
    if (sel.supplementId === 'patte' || sel.quantity === 0) continue;
    const supplement = getSupplementById(sel.supplementId);
    if (supplement) {
      baseTotal += supplement.price * sel.quantity;
    }
  }

  // Add patte if present
  const patteQty = getQty(selections, 'patte');
  if (patteQty > 0) {
    const pattePrice = computePattePrice(baseTotal);
    baseTotal += pattePrice * patteQty;
  }

  // Round to avoid floating point issues
  return Math.round(baseTotal * 100) / 100;
}

/**
 * Get the current patte unit price given existing selections
 */
export function getCurrentPattePrice(selections: SupplementSelection[]): number {
  let baseTotal = 0;
  for (const sel of selections) {
    if (sel.supplementId === 'patte' || sel.quantity === 0) continue;
    const supplement = getSupplementById(sel.supplementId);
    if (supplement) {
      baseTotal += supplement.price * sel.quantity;
    }
  }
  return computePattePrice(baseTotal);
}

/**
 * Get display label for patte (shows "Double Patte" when qty >= 2)
 */
export function getPatteLabel(qty: number): string {
  if (qty >= 2) return 'Double Patte';
  return 'Patte';
}

/**
 * Check if current combo rule is active
 */
export function isComboActive(selections: SupplementSelection[]): boolean {
  return getComboPrice(selections) !== null;
}
