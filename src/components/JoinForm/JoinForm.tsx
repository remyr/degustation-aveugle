import { addDoc, collection } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { HiArrowRight } from 'react-icons/hi';

import { db } from '@/firebase/client';
import { bottleCollection } from '@/models/Bottle';

import { Button } from '../Button';

export const JoinForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const id = router.query.id as string;

  const [col, loading] = useCollection(bottleCollection(id));
  const bottles = col?.docs.map((bottle) => ({ id: bottle.id }));

  const joinDegustation = async () => {
    if (name === '') {
      return;
    }

    if (!bottles || bottles?.length === 0) {
      return;
    }

    const data = {
      name,
    };

    const player = await addDoc(
      collection(db, 'degustation', id, 'players'),
      data
    );

    Cookies.set('player', player.id);
    router.push({
      pathname: '/degustation/[id]/game',
      query: {
        id,
        bottle: bottles[0].id,
      },
    });
  };

  return (
    <div className='flex flex-col mt-8 space-y-8 w-full'>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type='text'
        placeholder='Entrez votre nom'
        className='border-darkBlue py-3 w-full rounded-xl border focus:border-darkBlue focus:ring-darkBlue'
      />
      <Button
        full
        icon={<HiArrowRight className='mr-3 w-6 h-6' />}
        text='Démarrer'
        disabled={name === '' || loading}
        flat
        onClick={joinDegustation}
      />

      <div className='h-4'></div>
    </div>
  );
};
