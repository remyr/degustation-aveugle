import { addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { UndrawWine } from '@/components/Undraw/Wine';

import { Degustation, degustationCollection } from '@/models/Degustation';

export default function HomePage() {
  const router = useRouter();

  const createSession = async () => {
    const data: Degustation = {
      started: false,
      ended: false,
    };

    const degustation = await addDoc(degustationCollection, data);

    router.push(`/degustation/${degustation.id}`);
  };

  return (
    <div className='align-center flex flex-col justify-around items-center py-16 mx-auto space-y-8 max-w-lg text-black'>
      <div className='px-10 mb-8'>
        <UndrawWine />
      </div>
      <div className='flex flex-col items-center space-y-8 w-full'>
        <h1 className='flex items-center text-4xl font-semibold text-center'>
          Dégustation à l&apos;aveugle
        </h1>
        <p className='text-[#7E7C8A] px-10 text-lg text-center'>
          Créer une session et invite tes amis à une dégustation à
          l&apos;aveugle pour déterminer qui a le meilleur palais
        </p>
        <div className='mx-9 w-full'>
          <button
            onClick={createSession}
            className='bg-darkBlue drop-shadow-btn block py-5 w-full text-2xl font-semibold text-center text-white rounded-3xl'
          >
            Créer une session
          </button>
        </div>
      </div>
    </div>
  );
}
