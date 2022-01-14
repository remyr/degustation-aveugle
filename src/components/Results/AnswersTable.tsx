import { FC } from 'react';

import { Answer } from '@/models/Answer';
import { Bottle } from '@/models/Bottle';

interface AnswersTableProps {
  bottles: Array<Bottle & { id: string }>;
  playerAnswers: Answer[];
}

export const AnswersTable: FC<AnswersTableProps> = ({
  bottles,
  playerAnswers: pAnswers,
}) => {
  const playerAnswers = pAnswers.reduce<Record<string, string>>(
    (acc, value) => {
      return { ...acc, [value.bottle]: value.answer };
    },
    {}
  );

  return (
    <div className='flex flex-col space-y-8'>
      <div>
        <h1 className='mb-4 text-xl font-semibold text-black border-b border-black'>
          Réponses
        </h1>
        <div className='bg-[#EEE2E5] grid-cols-table grid gap-4 px-4 py-1 text-sm rounded-t-lg'>
          <div>#</div>
          <div>Type</div>
          <div>Bouteille</div>
        </div>
        {bottles.map((bottle, index) => (
          <div
            key={`bottle-${index}`}
            className='grid-cols-table grid gap-4 px-4 py-2 text-xs bg-white'
          >
            <div>{index + 1}</div>
            <div className='text-capitalize'>{bottle.type}</div>
            <div>{bottle.label}</div>
          </div>
        ))}
      </div>
      <div className='pb-8'>
        <h1 className='mb-4 text-xl font-semibold text-black border-b border-black'>
          Mes réponses
        </h1>
        <div className='bg-[#EEE2E5] grid-cols-table grid gap-8 px-4 py-1 text-sm rounded-t-lg'>
          <div>#</div>
          <div>Réponse</div>
          <div>Ma réponse</div>
        </div>
        {bottles.map((bottle, index) => (
          <div
            key={`bottle-${index}`}
            className='grid-cols-table grid gap-8 px-4 py-2 text-xs bg-white'
          >
            <div>{index + 1}</div>
            <div className='text-capitalize'>{bottle.type}</div>
            <div>
              {playerAnswers[bottle.id] === bottle.type ? `✅ - ` : `❌ - `}
              <span className='font-bold'>{playerAnswers[bottle.id]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
