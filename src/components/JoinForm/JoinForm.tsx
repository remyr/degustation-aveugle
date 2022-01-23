import { signInAnonymously } from 'firebase/auth';
import { addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import { auth } from '@/firebase/client';
import { GeneratedBottle, generatedBottleCollection } from '@/models/Bottle';
import { playerCollection } from '@/models/Player';
import { CollectionWithId } from '@/utils/genericFirebaseType';

import { Button } from '../Button';

export const JoinForm = () => {
  const router = useRouter();
  const [generatedBottles, setGeneratedBottles] = useState<
    CollectionWithId<GeneratedBottle>[]
  >([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<{ message: string } | null>(null);

  const id = router.query.id as string;

  useEffect(() => {
    if (!id) return;

    const q = query(generatedBottleCollection(id), orderBy('order'));

    return onSnapshot(q, (snapshot) => {
      const bottlesDocuments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGeneratedBottles(bottlesDocuments);
    });
  }, [id]);

  const joinDegustation = async () => {
    if (name === '' || !generatedBottles || generatedBottles?.length === 0) {
      return;
    }

    try {
      const { user } = await signInAnonymously(auth);
      const { uid } = user;

      try {
        await addDoc(playerCollection(id), {
          name,
          uid,
        });

        router.push({
          pathname: '/degustation/[id]/game',
          query: {
            id,
            bottle: generatedBottles[0].id,
          },
        });
      } catch (error) {
        setError({ message: "Impossible d'ajouter un joueur." });
      }
    } catch (error) {
      setError({ message: 'Impossible de se connecter.' });
    }

    setName('');
  };

  return (
    <div className='flex flex-col mt-8 space-y-8 w-full'>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Entrez votre nom'
          className='border-darkBlue py-3 w-full rounded-xl border focus:border-darkBlue focus:ring-darkBlue'
        />
        {error && (
          <p className='mt-1 text-xs text-red-500'>
            {`Une erreur s'est produite: ${error?.message}`}
          </p>
        )}
      </div>
      <Button
        full
        icon={<HiArrowRight className='mr-3 w-6 h-6' />}
        text='Démarrer'
        disabled={name === ''}
        flat
        onClick={joinDegustation}
      />

      <div className='h-4'></div>
    </div>
  );
};
