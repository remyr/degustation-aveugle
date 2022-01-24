import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import { Bottle } from '@/models/Bottle';
import { CollectionWithId } from '@/utils/genericFirebaseType';

import { BottleTable } from './BottleTable';

interface TabsProps {
  bottles: CollectionWithId<Bottle>[];
  generatedSession: CollectionWithId<Bottle>[];
}

export const Tabs: FC<TabsProps> = ({ bottles, generatedSession }) => {
  const [categories, setCategories] = useState({
    Bouteilles: <BottleTable bottles={bottles} />,
    'Session générée': <BottleTable bottles={generatedSession} />,
  });

  useEffect(() => {
    setCategories({
      Bouteilles: <BottleTable bottles={bottles} />,
      'Session générée': <BottleTable bottles={generatedSession} />,
    });
  }, [bottles, generatedSession]);

  return (
    <div className='px-6 my-8 w-full'>
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
