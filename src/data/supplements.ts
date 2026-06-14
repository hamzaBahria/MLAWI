import type { Supplement } from '../types';

export const SUPPLEMENTS: Supplement[] = [
  {
    id: 'kwika',
    name: 'Kwika',
    price: 1.0,
    emoji: '🥩',
    imagePath: '/assets/images/kwika.jpg',
  },
  {
    id: 'jambon',
    name: 'Jambon',
    price: 1.2,
    emoji: '🍖',
    imagePath: '/assets/images/jambon.jpg',
  },
  {
    id: 'salami',
    name: 'Salami',
    price: 0.5,
    emoji: '🥓',
    imagePath: '/assets/images/salami.jpg',
  },
  {
    id: 'scalope',
    name: 'Scalope',
    price: 3.0,
    emoji: '🍗',
    imagePath: '/assets/images/scalope.jpg',
  },
  {
    id: 'merguez',
    name: 'Merguez',
    price: 3.0,
    emoji: '🌭',
    imagePath: '/assets/images/merguez.jpg',
  },
  {
    id: 'melange',
    name: 'Mélange',
    price: 2.5,
    emoji: '🥘',
    imagePath: '/assets/images/melange.jpg',
  },
  {
    id: 'thon',
    name: 'Thon',
    price: 1.5,
    emoji: '🐟',
    imagePath: '/assets/images/thon.jpg',
  },
  {
    id: 'mozzarella',
    name: 'Mozzarella',
    price: 0.5,
    emoji: '🧀',
    imagePath: '/assets/images/mozzarella.jpg',
  },
  {
    id: 'slays',
    name: 'Slays',
    price: 0.5,
    emoji: '🫙',
    imagePath: '/assets/images/slays.jpg',
  },
  {
    id: '3adhma',
    name: '3adhma',
    price: 0.5,
    emoji: '🌶️',
    imagePath: '/assets/images/3adhma.jpg',
  },
  {
    id: 'triangle',
    name: 'Triangle',
    price: 0.5,
    emoji: '🔺',
    imagePath: '/assets/images/triangle.jpg',
  },
  {
    id: 'frites',
    name: 'Frites',
    price: 1.0,
    emoji: '🍟',
    imagePath: '/assets/images/frites.jpg',
  },
  {
    id: 'patte',
    name: 'Patte',
    price: 0, // dynamic
    emoji: '🫓',
    imagePath: '/assets/images/patte.jpg',
    isDynamic: true,
  },
];

export const getSupplementById = (id: string): Supplement | undefined =>
  SUPPLEMENTS.find((s) => s.id === id);
