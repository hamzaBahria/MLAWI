import { memo } from 'react';
import type { Supplement } from '../types';
import { getCurrentPattePrice, getPatteLabel } from '../utils/priceCalculator';
import type { SupplementSelection } from '../types';

interface Props {
  supplement: Supplement;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  isAdded: boolean;
  currentSelections: SupplementSelection[];
}

const SupplementCard = memo(function SupplementCard({
  supplement,
  quantity,
  onIncrement,
  onDecrement,
  isAdded,
  currentSelections,
}: Props) {
  const displayPrice = supplement.isDynamic
    ? getCurrentPattePrice(currentSelections)
    : supplement.price;

  const displayName =
    supplement.id === 'patte' ? getPatteLabel(quantity) : supplement.name;

  const isDoublePatte = supplement.id === 'patte' && quantity >= 2;

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl overflow-hidden shadow-sm border transition-all duration-200
        ${isAdded ? 'animate-pop' : ''}
        ${quantity > 0
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30 dark:border-brand-600'
          : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700'
        }
      `}
    >
      {/* Image */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={supplement.imagePath}
          alt={supplement.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = parent.querySelector('.emoji-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }
          }}
        />
        <div
          className="emoji-fallback hidden absolute inset-0 items-center justify-center text-5xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800"
        >
          {supplement.emoji}
        </div>

        {/* Quantity badge */}
        {quantity > 0 && (
          <div className="absolute top-2 right-2 w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold leading-none">{quantity}</span>
          </div>
        )}

        {/* Double Patte badge */}
        {isDoublePatte && (
          <div className="absolute bottom-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            Double!
          </div>
        )}
      </div>

      {/* Info + Controls */}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className={`font-semibold text-sm leading-tight ${quantity > 0 ? 'text-brand-700 dark:text-brand-400' : 'text-gray-800 dark:text-gray-100'}`}>
            {displayName}
          </span>
          <span className="text-brand-600 dark:text-brand-400 font-bold text-sm whitespace-nowrap ml-1">
            {displayPrice.toFixed(2)} DT
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onDecrement(supplement.id)}
            disabled={quantity === 0}
            className={`
              flex-1 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-all active:scale-95
              ${quantity === 0
                ? 'bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-100 active:bg-gray-300'
              }
            `}
            aria-label={`Retirer ${supplement.name}`}
          >
            −
          </button>

          <span className={`
            w-10 text-center text-xl font-bold tabular-nums transition-all duration-150
            ${quantity > 0 ? 'text-brand-600 dark:text-brand-400' : 'text-gray-300 dark:text-gray-600'}
          `}>
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => onIncrement(supplement.id)}
            className={`
              flex-1 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-all active:scale-95
              ${isAdded
                ? 'bg-brand-400 text-white'
                : 'bg-brand-500 hover:bg-brand-600 text-white active:bg-brand-700'
              }
            `}
            aria-label={`Ajouter ${supplement.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
});

export default SupplementCard;
