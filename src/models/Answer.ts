import { createCollection } from '@/utils/createCollection';

import { BOTTLE_TYPE } from './Bottle';

export interface Answer {
  answer: BOTTLE_TYPE;
  bottle: string;
  player: string;
}

export const answerCollection = (degustationId: string) =>
  createCollection<Answer>(`degustation/${degustationId}/answers`);
