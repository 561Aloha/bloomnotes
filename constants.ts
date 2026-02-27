// constants.ts
import { Flower, BouquetHolder } from './types';

// 🌸 Flower imports
import flower1 from './assets/flower1.webp';
import flower2 from './assets/flower2.webp';
import flower3 from './assets/flower3.webp';
import flower4 from './assets/flower4.webp';
import flower5 from './assets/flower5.webp';
import flower6 from './assets/flower6.webp';
import flower7 from './assets/flower7.webp';
import flower8 from './assets/flower8.webp';
import flower9 from './assets/flower9.webp';
import flower10 from './assets/flower10.webp';
import flower11 from './assets/flower11.webp';
import flower12 from './assets/flower12.webp';
import flower13 from './assets/flower13.webp';
import flower14 from './assets/flower14.webp';

// 🌿 Holder PNG imports (YOUR greenery files)
import greenery2 from './assets/greenery2.webp';
import greenery3 from './assets/greenery3.webp';
import greenery4 from './assets/greenery4.webp';
import greenery5 from './assets/greenery5.webp';
import greenery6 from './assets/greenery6.webp';
import greenery7 from './assets/greenery7.webp';

export const FLOWERS: Flower[] = [
  { id: '1', name: 'Peony', imageUrl: flower1, color: 'bg-pink-100' },
  { id: '2', name: 'Hydrangea', imageUrl: flower2, color: 'bg-blue-100' },
  { id: '3', name: 'Lily', imageUrl: flower3, color: 'bg-yellow-100' },
  { id: '4', name: 'Poppy', imageUrl: flower4, color: 'bg-red-100' },
  { id: '5', name: 'Rose', imageUrl: flower5, color: 'bg-pink-200' },
  { id: '6', name: 'Sunflower', imageUrl: flower6, color: 'bg-yellow-200' },
  { id: '7', name: 'Tulip', imageUrl: flower7, color: 'bg-purple-100' },
  { id: '8', name: 'Orchid', imageUrl: flower8, color: 'bg-purple-200' },
  { id: '9', name: 'Daisy', imageUrl: flower9, color: 'bg-green-100' },
  { id: '10', name: 'Carnation', imageUrl: flower10, color: 'bg-rose-100' },
  { id: '11', name: 'Ranunculus', imageUrl: flower11, color: 'bg-orange-100' },
  { id: '13', name: 'HandDrawn', imageUrl: flower12, color: 'bg-orange-100' },
  { id: '14', name: 'HandDrawn', imageUrl: flower13, color: 'bg-orange-100' },
  { id: '15', name: 'HandDrawn', imageUrl: flower14, color: 'bg-orange-100' },
];

export const HOLDERS: BouquetHolder[] = [
  { id: 'greenery-2', name: 'Greenery 2', imageUrl: greenery2 },
  { id: 'greenery-3', name: 'Greenery 3', imageUrl: greenery3 },
  { id: 'greenery-4', name: 'Greenery 4', imageUrl: greenery4 },
  { id: 'greenery-5', name: 'Greenery 5', imageUrl: greenery5 },
  { id: 'greenery-6', name: 'Greenery 6', imageUrl: greenery6 },
  { id: 'greenery-7', name: 'Greenery 7', imageUrl: greenery7 },
];
