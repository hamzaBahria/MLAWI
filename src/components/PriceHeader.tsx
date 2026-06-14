import React, { memo } from 'react';
import { isComboActive } from '../utils/priceCalculator';
import type { SupplementSelection } from '../types';

interface Props {
  totalPrice: number;
  onReset: () => void;
  onAddToOrder: () => void;
  onToggleOrder: () => void;
  orderCount: number;
  selections: SupplementSelection[];
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleHistory: () => void;
}

const PriceHeader = memo(function PriceHeader({
  totalPrice,
  onReset,
  onAddToOrder,
  onToggleOrder,
  orderCount,
  selections,
  isDark,
  onToggleTheme,
  onToggleHistory,
}: Props) {
  const hasSelections = selections.some((s) => s.quantity > 0);
  const comboActive = isComboActive(selections);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-base font-bold text-gray-800 dark:text-white tracking-tight">
          🫓 Calculateur Mlawi
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleHistory}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
            aria-label="Historique"
          >
            📋
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
            aria-label="Thème"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Price display */}
      <div className="px-4 pb-3">
        <div className={`
          rounded-2xl p-4 flex items-center justify-between
          ${comboActive
            ? 'bg-gradient-to-r from-brand-500 to-brand-400'
            : 'bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600'
          }
        `}>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">
              {comboActive ? '⭐ Offre Spéciale' : 'Prix total'}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-white text-4xl font-black tabular-nums leading-none">
                {totalPrice.toFixed(2)}
              </span>
              <span className="text-white/80 text-lg font-semibold">DT</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            disabled={!hasSelections}
            className={`
              h-12 px-4 rounded-xl text-sm font-bold transition-all active:scale-95
              ${hasSelections
                ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
              }
            `}
            aria-label="Nouvelle Mlawi"
          >
            Nouvelle
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onAddToOrder}
            disabled={!hasSelections}
            className={`
              flex-1 h-12 rounded-xl text-sm font-bold transition-all active:scale-95
              ${hasSelections
                ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm active:bg-brand-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }
            `}
          >
            + Ajouter à la commande
          </button>

          <button
            type="button"
            onClick={onToggleOrder}
            className="relative h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold active:scale-95 transition-all"
            aria-label="Voir la commande"
          >
            🧾
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
});

export default PriceHeader;
