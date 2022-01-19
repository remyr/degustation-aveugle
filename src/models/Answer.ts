import { createCollection } from '@/utils/createCollection';

import { BottleType } from './Bottle';

export interface Answer {
  answer: BottleType;
  bottle: string;
  player: string;
}

export const answerCollection = (degustationId: string) =>
  createCollection<Answer>(`degustation/${degustationId}/answers`);
