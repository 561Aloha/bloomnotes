// constants.ts

import { Flower, BouquetHolder } from './types';

// 🌸 Import local flower assets
import flower1 from './assets/flower1.png';
import flower2 from './assets/flower2.png';
import flower3 from './assets/flower3.png';
import flower4 from './assets/flower4.png';
import flower5 from './assets/flower5.png';
import flower6 from './assets/flower6.png';
import flower7 from './assets/flower7.png';
import flower8 from './assets/flower8.png';
import flower9 from './assets/flower9.png';
import flower10 from './assets/flower10.png';
import flower11 from './assets/flower11.png';
import flower12 from './assets/flower12.png';
import flower13 from './assets/flower13.png';

import flower14 from './assets/flower14.png';

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
  { id: '14', name: 'Ranunculus', imageUrl: flower13, color: 'bg-orange-100' },
  { id: '15', name: 'Ranunculus', imageUrl: flower14, color: 'bg-orange-100' },
];

export const HOLDERS: BouquetHolder[] = [
  {
    id: 'h1',
    name: 'Craft Paper',
    imageUrl: '/holders/craft-paper.png',
  },
  {
    id: 'h2',
    name: 'Glass Vase',
    imageUrl: '/holders/glass-vase.png',
  },
  {
    id: 'h3',
    name: 'Ceramic Jar',
    imageUrl: '/holders/ceramic-jar.png',
  },
  {
    id: 'h4',
    name: 'Greenery Wrap',
    imageUrl: '/holders/greenery-wrap.png',
  },
  {
    id: 'h5',
    name: 'Silk Ribbon',
    imageUrl: '/holders/silk-ribbon.png',
  },
];
