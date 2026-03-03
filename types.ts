export interface Flower {
  id: string;
  name: string;
  imageBase: string; 
  imageThumb?: string;  // optional so existing flowers without thumbs still work
  color: string;
}

export interface BouquetHolder {
  id: string;
  name: string;
  imageBase: string; 
}
export interface SelectedFlower extends Flower {
  instanceId: string;
  zIndex: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}


export type Step = 'selection' | 'arrangement' | 'message' | 'share';

export type LayoutType = 'diamond' | 'circle';
