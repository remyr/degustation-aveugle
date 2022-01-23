import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiTrophy } from 'react-icons/bi';
import { HiArrowRight } from 'react-icons/hi';

import { auth } from '@/firebase/client';
import { answersCollection } from '@/models/Answer';
import { BottleType, generatedBottleCollection } from '@/models/Bottle';

import { Button } from '../Button';
import { ResponseButton } from '../ResponseButton';

export const GameForm = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<BottleType | null>(null);
  const [currentBottle, setCurrentBottle] = useState<number>(0);
  const [nextBottle, setNextBottle] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<string | null>(null);

  const id = router.query.id as string;
  const bottleId = router.query.bottle as string;

  useEffect(() => {
    if (!id) return;

    const q = query(generatedBottleCollection(id), orderBy('order'));

    return onSnapshot(q, (snapshot) => {
      const bottleIds = snapshot.docs.map((doc) => doc.id);
      setCurrentBottle(bottleIds?.indexOf(bottleId));
      setNextBottle(bottleIds[(currentBottle + 1) as number] || null);
    });
  }, [bottleId, currentBottle, id]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedUser(uid);
      }
    });
  }, []);

  const guess = async () => {
    if (selected === null || loggedUser === null) {
      return;
    }
    await addDoc(answersCollection(id), {
      userId: loggedUser,
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
          onClick={() => setSelected(BottleType.Blanc)}
          selected={selected === BottleType.Blanc}
        />
        <ResponseButton
          text='Vin rosé'
          onClick={() => setSelected(BottleType.Rose)}
          selected={selected === BottleType.Rose}
        />
        <ResponseButton
          text='Vin rouge'
          onClick={() => setSelected(BottleType.Rouge)}
          selected={selected === BottleType.Rouge}
        />
      </div>
      <div className='flex flex-col mt-8 w-full'>
        {nextBottle === null ? (
          <Button
            full
            icon={<BiTrophy className='mr-3 w-6 h-6' />}
            text='Voir les résultats'
            disabled={selected === null}
            onClick={guess}
          />
        ) : (
          <Button
            full
            icon={<HiArrowRight className='mr-3 w-6 h-6' />}
            text='Bouteille suivante'
            disabled={selected === null}
            onClick={guess}
          />
        )}
      </div>
    </div>
  );
};
