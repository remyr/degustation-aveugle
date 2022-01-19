import cx from 'classnames';
import { onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Bottle, bottleCollection } from '@/models/Bottle';
import { CollectionWithId } from '@/utils/genericFirebaseType';

export const SettingsTable = () => {
  const router = useRouter();
  const [bottles, setBottles] = useState<CollectionWithId<Bottle>[]>([]);
  const [_loading, setLoading] = useState(true);

  const id = router.query.id as string;

  useEffect(() => {
    if (!id) {
      return;
    }

    const unsubscribe = onSnapshot(bottleCollection(id), (snapshot) => {
      const bottlesDocuments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBottles(bottlesDocuments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <div className='px-6 mt-8'>
      {bottles.length === 0 ? (
        <div>
          <p className='text-center'>Aucune bouteilles</p>
        </div>
      ) : (
        <>
          <div className='bg-[#EEE2E5] grid-cols-table grid gap-4 px-4 py-1 text-sm rounded-t-lg'>
            <div>#</div>
            <div>Type</div>
            <div>Bouteille</div>
          </div>

          {bottles.map((bottle, index) => (
            <div
              key={`bottle-${index}`}
              className={cx(
                'grid-cols-table grid gap-4 px-4 py-2 text-xs bg-white',
                index + 1 === bottles.length && 'rounded-b-lg '
              )}
            >
              <div>{index + 1}</div>
              <div className='text-capitalize'>{bottle.type}</div>
              <div>{bottle.label}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
