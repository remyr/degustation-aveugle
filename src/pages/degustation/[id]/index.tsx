/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';

import { DegustationButtonsList } from '@/components/DegustationButtonsList';
// import { BeerCelebration } from '@/components/Undraw/BeerCelebration';
import { SessionGroup } from '@/components/Splash/SessionGroup';

const HomeSession = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  if (!id) {
    return null;
  }

  return (
    <div className='flex flex-col justify-around items-center mt-8'>
      <div className='h-[250px] w-[250px] flex justify-center items-center'>
        <SessionGroup />
      </div>
      <div className='px-10 mt-4'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Dégustation à l&apos;aveugle
        </h1>
        <DegustationButtonsList />
      </div>
    </div>
  );
};

export default HomeSession;
