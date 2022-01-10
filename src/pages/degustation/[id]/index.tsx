/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';

import { DegustationButtonsList } from '@/components/DegustationButtonsList';
import { BeerCelebration } from '@/components/Undraw/BeerCelebration';

const HomeSession = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  if (!id) {
    return null;
  }

  // const [value, loading, error] = useDocument(doc(db, 'degustation', id));

  // console.log(value?.data());

  return (
    <div className='flex flex-col justify-around items-center'>
      <div className='bg-darkGrey h-[250px] w-[250px] flex justify-center items-center p-10 rounded-full'>
        <BeerCelebration />
      </div>
      <div className='px-10'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Dégustation à l&apos;aveugle
        </h1>
        <DegustationButtonsList />
      </div>
    </div>
  );
};

export default HomeSession;
