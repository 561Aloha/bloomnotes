// constants.ts
import { Flower, BouquetHolder } from './types';

// 🌸 Flower imports (full size - used in arrangement step)
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

// 🌿 Holder imports
import greenery2 from './assets/greenery2.webp';
import greenery3 from './assets/greenery3.webp';
import greenery4 from './assets/greenery4.webp';
import greenery5 from './assets/greenery5.webp';
import greenery6 from './assets/greenery6.webp';
import greenery7 from './assets/greenery7.webp';

export const FLOWERS: Flower[] = [
  { id: '1',  name: 'Peony',      imageBase: flower1,  imageThumb: '/assets/thumbs/flower1.webp',  color: 'bg-pink-100' },
  { id: '2',  name: 'Hydrangea',  imageBase: flower2,  imageThumb: '/assets/thumbs/flower2.webp',  color: 'bg-blue-100' },
  { id: '3',  name: 'Lily',       imageBase: flower3,  imageThumb: '/assets/thumbs/flower3.webp',  color: 'bg-yellow-100' },
  { id: '4',  name: 'Poppy',      imageBase: flower4,  imageThumb: '/assets/thumbs/flower4.webp',  color: 'bg-red-100' },
  { id: '5',  name: 'Rose',       imageBase: flower5,  imageThumb: '/assets/thumbs/flower5.webp',  color: 'bg-pink-200' },
  { id: '6',  name: 'Sunflower',  imageBase: flower6,  imageThumb: '/assets/thumbs/flower6.webp',  color: 'bg-yellow-200' },
  { id: '7',  name: 'Tulip',      imageBase: flower7,  imageThumb: '/assets/thumbs/flower7.webp',  color: 'bg-purple-100' },
  { id: '8',  name: 'Orchid',     imageBase: flower8,  imageThumb: '/assets/thumbs/flower8.webp',  color: 'bg-purple-200' },
  { id: '9',  name: 'Daisy',      imageBase: flower9,  imageThumb: '/assets/thumbs/flower9.webp',  color: 'bg-green-100' },
  { id: '10', name: 'Carnation',  imageBase: flower10, imageThumb: '/assets/thumbs/flower10.webp', color: 'bg-rose-100' },
  { id: '11', name: 'Ranunculus', imageBase: flower11, imageThumb: '/assets/thumbs/flower11.webp', color: 'bg-orange-100' },
  { id: '13', name: 'HandDrawn',  imageBase: flower12, imageThumb: '/assets/thumbs/flower12.webp', color: 'bg-orange-100' },
  { id: '14', name: 'HandDrawn',  imageBase: flower13, imageThumb: '/assets/thumbs/flower13.webp', color: 'bg-orange-100' },
  { id: '15', name: 'HandDrawn',  imageBase: flower14, imageThumb: '/assets/thumbs/flower14.webp', color: 'bg-orange-100' },
];

export const HOLDERS: BouquetHolder[] = [
  { id: 'greenery-2', name: 'Greenery 2', imageBase: greenery2 },
  { id: 'greenery-3', name: 'Greenery 3', imageBase: greenery3 },
  { id: 'greenery-4', name: 'Greenery 4', imageBase: greenery4 },
  { id: 'greenery-5', name: 'Greenery 5', imageBase: greenery5 },
  { id: 'greenery-6', name: 'Greenery 6', imageBase: greenery6 },
  { id: 'greenery-7', name: 'Greenery 7', imageBase: greenery7 },
];