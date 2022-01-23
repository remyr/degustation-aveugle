import { createCollection } from '@/utils/createCollection';

export interface Player {
  name: string;
  uid: string;
  answers?: [];
}

export const playerCollection = (degustationId: string) =>
  createCollection<Player>(`degustation/${degustationId}/players`);
