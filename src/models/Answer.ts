import { createCollection } from '@/utils/createCollection';

import { BottleType } from './Bottle';

export interface Answer {
  answer: BottleType;
  bottle: string;
  userId: string;
}

export const answersCollection = (degustationId: string) =>
  createCollection<Answer>(`degustation/${degustationId}/answers`);
