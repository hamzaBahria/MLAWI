import { memo } from 'react';
import type { Order } from '../types';
import { getSupplementById } from '../data/supplements';
import { getPatteLabel } from '../utils/priceCalculator';

interface Props {
  order: Order | null;
  orderTotal: number;
  onRemoveMlawi: (id: string) => void;
  onResetOrder: () => void;
  onClose: () => void;
}

const OrderPanel = memo(function OrderPanel({
  order,
  orderTotal,
  onRemoveMlawi,
  onResetOrder,
  onClose,
}: Props) {
  const mlawis = order?.mlawis ?? [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-black text-gray-800 dark:text-white">🧾 Commande</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xl active:scale-95 transition-transform"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {mlawis.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-gray-600">
            <span className="text-5xl mb-3">🫓</span>
            <p className="text-base font-medium">Aucune Mlawi dans la commande</p>
            <p className="text-sm mt-1">Ajoutez des Mlawi depuis le calculateur</p>
          </div>
        ) : (
          mlawis.map((mlawi, index) => (
            <div
              key={mlawi.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-800 dark:text-white text-base">
                  Mlawi #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-brand-600 dark:text-brand-400 font-black text-lg">
                    {mlawi.totalPrice.toFixed(2)} DT
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveMlawi(mlawi.id)}
                    className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center text-sm active:scale-95 transition-transform"
                    aria-label="Supprimer"
                  >
                    🗑
                  </button>
                </div>
              </div>

              {/* Ingredients list */}
              <div className="flex flex-wrap gap-1">
                {mlawi.selections
                  .filter((s) => s.quantity > 0)
                  .map((sel) => {
                    const supp = getSupplementById(sel.supplementId);
                    if (!supp) return null;
                    const label =
                      sel.supplementId === 'patte'
                        ? getPatteLabel(sel.quantity)
                        : supp.name;
                    return (
                      <span
                        key={sel.supplementId}
                        className="inline-flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                      >
                        {supp.emoji} {label}
                        {sel.quantity > 1 && sel.supplementId !== 'patte' && (
                          <span className="text-brand-500 font-bold">×{sel.quantity}</span>
                        )}
                      </span>
                    );
                  })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {mlawis.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {mlawis.length} Mlawi{mlawis.length > 1 ? 's' : ''}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">
                {orderTotal.toFixed(2)}
              </span>
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">DT</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetOrder}
            className="w-full h-13 py-3.5 rounded-2xl bg-red-500 text-white font-bold text-base active:scale-95 transition-all active:bg-red-600"
          >
            🗑 Réinitialiser la commande
          </button>
        </div>
      )}
    </div>
  );
});

export default OrderPanel;
