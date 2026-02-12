
export interface Flower {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
}

export interface SelectedFlower extends Flower {
  instanceId: string;
  zIndex: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface BouquetHolder {
  id: string;
  name: string;
  imageUrl: string;
}

export type Step = 'selection' | 'arrangement' | 'message' | 'share';

export type LayoutType = 'diamond' | 'circle';
