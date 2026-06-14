import { useState, useMemo } from 'react';
import { SUPPLEMENTS } from './data/supplements';
import { useMlawi } from './hooks/useMlawi';
import { useTheme } from './hooks/useTheme';
import PriceHeader from './components/PriceHeader';
import SupplementCard from './components/SupplementCard';
import SearchBar from './components/SearchBar';
import OrderPanel from './components/OrderPanel';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const {
    selections,
    totalPrice,
    getQty,
    increment,
    decrement,
    reset,
    lastAdded,
    order,
    orderTotal,
    addToOrder,
    removeMlawiFromOrder,
    resetOrder,
  } = useMlawi();

  const { isDark, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [showOrder, setShowOrder] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const filteredSupplements = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SUPPLEMENTS;
    return SUPPLEMENTS.filter((s) => s.name.toLowerCase().includes(q));
  }, [search]);

  const orderCount = order?.mlawis.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <PriceHeader
        totalPrice={totalPrice}
        onReset={reset}
        onAddToOrder={addToOrder}
        onToggleOrder={() => setShowOrder(true)}
        orderCount={orderCount}
        selections={selections}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleHistory={() => setShowHistory(true)}
      />

      <main className="px-3 py-4 max-w-xl mx-auto">
        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {filteredSupplements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-600">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-base font-medium">Aucun résultat pour "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredSupplements.map((supplement) => (
              <SupplementCard
                key={supplement.id}
                supplement={supplement}
                quantity={getQty(supplement.id)}
                onIncrement={increment}
                onDecrement={decrement}
                isAdded={lastAdded === supplement.id}
                currentSelections={selections}
              />
            ))}
          </div>
        )}
      </main>

      {showOrder && (
        <OrderPanel
          order={order}
          orderTotal={orderTotal}
          onRemoveMlawi={removeMlawiFromOrder}
          onResetOrder={() => {
            resetOrder();
            setShowOrder(false);
          }}
          onClose={() => setShowOrder(false)}
        />
      )}

      {showHistory && <HistoryPanel onClose={() => setShowHistory(false)} />}
    </div>
  );
}

export default App;
