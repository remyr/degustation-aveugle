import cx from 'classnames';
import { FC } from 'react';

import { Bottle } from '@/models/Bottle';
import { CollectionWithId } from '@/utils/genericFirebaseType';

interface BottleTableProps {
  bottles: CollectionWithId<Bottle>[];
}

export const BottleTable: FC<BottleTableProps> = ({ bottles }) => {
  return (
    <div className='mt-6'>
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
