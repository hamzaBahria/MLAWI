import { useState, useCallback, useMemo } from 'react';
import type { SupplementSelection, MlawiComposition, Order } from '../types';
import { calculateTotal } from '../utils/priceCalculator';
import { saveToHistory, getCurrentOrder, saveOrder, clearOrder } from '../utils/storage';
import { vibrateLight, vibrateSuccess } from '../utils/haptics';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useMlawi() {
  const [selections, setSelections] = useState<SupplementSelection[]>([]);
  const [order, setOrder] = useState<Order | null>(getCurrentOrder);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const totalPrice = useMemo(() => calculateTotal(selections), [selections]);

  const getQty = useCallback(
    (supplementId: string): number =>
      selections.find((s) => s.supplementId === supplementId)?.quantity ?? 0,
    [selections]
  );

  const increment = useCallback((supplementId: string) => {
    vibrateLight();
    setSelections((prev) => {
      const existing = prev.find((s) => s.supplementId === supplementId);
      if (existing) {
        return prev.map((s) =>
          s.supplementId === supplementId ? { ...s, quantity: s.quantity + 1 } : s
        );
      }
      return [...prev, { supplementId, quantity: 1 }];
    });
    setLastAdded(supplementId);
    setTimeout(() => setLastAdded(null), 400);
  }, []);

  const decrement = useCallback((supplementId: string) => {
    vibrateLight();
    setSelections((prev) => {
      const existing = prev.find((s) => s.supplementId === supplementId);
      if (!existing || existing.quantity <= 0) return prev;
      if (existing.quantity === 1) {
        return prev.filter((s) => s.supplementId !== supplementId);
      }
      return prev.map((s) =>
        s.supplementId === supplementId ? { ...s, quantity: s.quantity - 1 } : s
      );
    });
  }, []);

  const reset = useCallback(() => {
    vibrateSuccess();
    setSelections([]);
  }, []);

  const addToOrder = useCallback(() => {
    if (totalPrice === 0) return;

    const mlawi: MlawiComposition = {
      id: generateId(),
      selections: [...selections],
      totalPrice,
      createdAt: Date.now(),
    };

    saveToHistory(mlawi);
    vibrateSuccess();

    setOrder((prev) => {
      const updated: Order = prev
        ? { ...prev, mlawis: [...prev.mlawis, mlawi] }
        : { id: generateId(), mlawis: [mlawi], createdAt: Date.now() };
      saveOrder(updated);
      return updated;
    });

    setSelections([]);
  }, [selections, totalPrice]);

  const removeMlawiFromOrder = useCallback((mlawiId: string) => {
    vibrateLight();
    setOrder((prev) => {
      if (!prev) return null;
      const updated = { ...prev, mlawis: prev.mlawis.filter((m) => m.id !== mlawiId) };
      if (updated.mlawis.length === 0) {
        clearOrder();
        return null;
      }
      saveOrder(updated);
      return updated;
    });
  }, []);

  const resetOrder = useCallback(() => {
    vibrateSuccess();
    clearOrder();
    setOrder(null);
  }, []);

  const orderTotal = useMemo(
    () =>
      Math.round(
        (order?.mlawis.reduce((sum, m) => sum + m.totalPrice, 0) ?? 0) * 100
      ) / 100,
    [order]
  );

  return {
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
  };
}
