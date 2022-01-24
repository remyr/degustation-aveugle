import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import { GeneratedBottle } from '@/models/Bottle';
import { CollectionWithId } from '@/utils/genericFirebaseType';

import { AnswersTable } from './AnswersTable';
import { ScoreTable } from './ScoreTable';

interface TabsProps {
  scores: { name: string; score: number; total: number }[];
  bottles: CollectionWithId<GeneratedBottle>[];
}

export const Tabs: FC<TabsProps> = ({ scores, bottles }) => {
  const [categories, setCategories] = useState({
    'Tableau des scores': <ScoreTable scores={scores} />,
    Réponses: <AnswersTable generatedBottles={bottles} />,
  });

  useEffect(() => {
    setCategories({
      'Tableau des scores': <ScoreTable scores={scores} />,
      Réponses: <AnswersTable generatedBottles={bottles} />,
    });
  }, [scores, bottles]);

  return (
    <div className='px-6 mx-auto my-8 w-full'>
      <Tab.Group>
        <Tab.List className='drop-shadow-light flex p-1 space-x-1 bg-white rounded-xl'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'py-2.5 w-full text-sm font-medium leading-5 rounded-lg',
                  'ring-white ring-opacity-60 ring-offset-0 ring-offset-black focus:ring-2 focus:outline-none',
                  selected
                    ? 'bg-darkBlue shadow text-white'
                    : 'text-darkBlue hover:bg-darkBlue/[0.12] hover:darkBlue'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((el, idx) => (
            <Tab.Panel key={idx}>{el}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
