import { addDoc, collection } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { BiTrophy } from 'react-icons/bi';
import { HiArrowRight } from 'react-icons/hi';

import { db } from '@/firebase/client';
import { BOTTLE_TYPE, bottleCollection } from '@/models/Bottle';

import { Button } from '../Button';
import { ResponseButton } from '../ResponseButton';

export const GameForm = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<BOTTLE_TYPE | null>(null);
  const [currentBottle, setCurrentBottle] = useState<number>(0);
  const [nextBottle, setNextBottle] = useState<string | null>(null);

  const id = router.query.id as string;
  const bottleId = router.query.bottle as string;

  const [col, loading] = useCollection(bottleCollection(id));

  useEffect(() => {
    const bottles = col?.docs.map((bottle) => bottle.id) || [];
    setCurrentBottle(bottles?.indexOf(bottleId));
    setNextBottle(bottles[(currentBottle + 1) as number] || null);
  }, [bottleId, col?.docs, currentBottle]);

  // const currentBottle = bottles?.indexOf(bottleId);
  // const nextBottle = bottles[(currentBottle + 1) as number] || null;

  const guess = async () => {
    const playerId = Cookies.get('player');
    if (!playerId) {
      return;
    }

    await addDoc(collection(db, 'degustation', id, 'answers'), {
      player: playerId,
      answer: selected,
      bottle: bottleId,
    });

    setSelected(null);

    if (nextBottle === null) {
      router.push({
        pathname: '/degustation/[id]/results',
        query: {
          id,
        },
      });

      return;
    }

    router.push({
      pathname: '/degustation/[id]/game',
      query: {
        id,
        bottle: nextBottle,
      },
    });
  };

  return (
    <div className='flex flex-col flex-1 justify-around items-center px-10 pb-10 w-full'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Bouteille #{currentBottle + 1}
        </h1>
        {/* <Step total={15} current={4} /> */}
      </div>
      <div className='flex flex-col mt-8 space-y-8 w-full'>
        <ResponseButton
          text='Vin blanc'
          onClick={() => setSelected('blanc')}
          selected={selected === 'blanc'}
        />
        <ResponseButton
          text='Vin rosé'
          onClick={() => setSelected('rose')}
          selected={selected === 'rose'}
        />
        <ResponseButton
          text='Vin rouge'
          onClick={() => setSelected('rouge')}
          selected={selected === 'rouge'}
        />
      </div>
      <div className='flex flex-col mt-8 w-full'>
        {nextBottle === null ? (
          <Button
            full
            icon={<BiTrophy className='mr-3 w-6 h-6' />}
            text='Voir les résultats'
            disabled={selected === null || loading}
            onClick={guess}
          />
        ) : (
          <Button
            full
            icon={<HiArrowRight className='mr-3 w-6 h-6' />}
            text='Bouteille suivante'
            disabled={selected === null || loading}
            onClick={guess}
          />
        )}
      </div>
    </div>
  );
};
