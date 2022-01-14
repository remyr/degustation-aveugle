import { createCollection } from '@/utils/createCollection';

export interface Player {
  name: string;
}

export const playerCollection = (degustationId: string) =>
  createCollection<Player>(`degustation/${degustationId}/players`);
