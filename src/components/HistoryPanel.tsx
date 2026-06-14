import { memo, useState } from 'react';
import type { MlawiComposition } from '../types';
import { getSupplementById } from '../data/supplements';
import { getHistory, clearHistory } from '../utils/storage';
import { getPatteLabel } from '../utils/priceCalculator';

interface Props {
  onClose: () => void;
}

const HistoryPanel = memo(function HistoryPanel({ onClose }: Props) {
  const [history, setHistory] = useState<MlawiComposition[]>(() => getHistory());

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString('fr-TN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 animate-slide-up">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-black text-gray-800 dark:text-white">📋 Historique</h2>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="h-10 px-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-sm font-medium active:scale-95 transition-transform"
            >
              Effacer
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 active:scale-95 transition-transform"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-gray-600">
            <span className="text-5xl mb-3">📋</span>
            <p className="text-base font-medium">Aucun historique</p>
            <p className="text-sm mt-1">Les 10 dernières Mlawi apparaîtront ici</p>
          </div>
        ) : (
          history.map((mlawi, index) => (
            <div
              key={mlawi.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-800 dark:text-white text-base">
                    Mlawi #{history.length - index}
                  </span>
                  <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                    {formatTime(mlawi.createdAt)}
                  </span>
                </div>
                <span className="text-brand-600 dark:text-brand-400 font-black text-lg">
                  {mlawi.totalPrice.toFixed(2)} DT
                </span>
              </div>
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
    </div>
  );
});

export default HistoryPanel;
