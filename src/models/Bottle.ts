import { createCollection } from '@/utils/createCollection';

export type BOTTLE_TYPE = 'blanc' | 'rose' | 'rouge';

export interface Bottle {
  label: boolean;
  type: BOTTLE_TYPE;
}

export const bottleCollection = (degustationId: string) =>
  createCollection<Bottle>(`degustation/${degustationId}/bottles`);
