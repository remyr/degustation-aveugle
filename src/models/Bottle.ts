import { createCollection } from '@/utils/createCollection';

export type BOTTLE_TYPE = 'blanc' | 'rose' | 'rouge';

export enum BottleType {
  Blanc = 'Blanc',
  Rose = 'Rosé',
  Rouge = 'Rouge',
}

export interface Bottle {
  label: string;
  type: BottleType;
}

export interface GeneratedBottle extends Bottle {
  order: number;
}

export const bottleCollection = (degustationId: string) =>
  createCollection<Bottle>(`degustation/${degustationId}/bottles`);

export const generatedBottleCollection = (degustationId: string) =>
  createCollection<GeneratedBottle>(
    `degustation/${degustationId}/generatedBottles`
  );
