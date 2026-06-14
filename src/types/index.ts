export interface Supplement {
  id: string;
  name: string;
  price: number; // base price
  emoji: string;
  imagePath: string;
  isDynamic?: boolean; // for Patte
}

export interface SupplementSelection {
  supplementId: string;
  quantity: number;
}

export interface MlawiComposition {
  id: string;
  selections: SupplementSelection[];
  totalPrice: number;
  createdAt: number;
}

export interface Order {
  id: string;
  mlawis: MlawiComposition[];
  createdAt: number;
}

export type ViewMode = 'calculator' | 'history' | 'order';
