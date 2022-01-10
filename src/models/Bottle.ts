import { createCollection } from '@/utils/createCollection';

export interface Bottle {
  label: boolean;
  type: 'blanc' | 'rose' | 'rouge';
}

export const bottleCollection = (degustationId: string) =>
  createCollection<Bottle>(`degustation/${degustationId}/bottles`);
