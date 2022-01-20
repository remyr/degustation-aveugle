import { doc } from 'firebase/firestore';

import { createCollection } from '@/utils/createCollection';

export interface Degustation {
  started: boolean;
  ended: boolean;
}

export const degustationCollection =
  createCollection<Degustation>('degustation');

export const degustationDocument = (id: string) =>
  doc(degustationCollection, id);
