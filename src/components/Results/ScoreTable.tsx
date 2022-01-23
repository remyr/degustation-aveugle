import { FC } from 'react';

interface ScoreTableProps {
  scores: { name: string; score: number; total: number }[];
}

export const ScoreTable: FC<ScoreTableProps> = ({ scores }) => {
  return (
    <div className='flex flex-col mt-8 space-y-8'>
      <div>
        <div className='bg-[#EEE2E5] grid-cols-table grid gap-4 px-4 py-1 rounded-t-lg'>
          <div>#</div>
          <div>Score</div>
          <div>Personne</div>
        </div>
        {scores
          .sort((scoreA, scoreB) => scoreB.score - scoreA.score)
          .map((row, index) => (
            <div
              key={`bottle-${index}`}
              className='grid-cols-table grid gap-4 px-4 py-2 text-sm bg-white'
            >
              <div>{index + 1}</div>
              <div className='text-capitalize font-bold'>
                {row.score}/{row.total}
              </div>
              <div>{row.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
