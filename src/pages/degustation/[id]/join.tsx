import { useRouter } from 'next/router';

import { JoinForm } from '@/components/JoinForm';
import { BeerCelebration } from '@/components/Undraw/BeerCelebration';

const Join = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  if (!id) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='bg-darkGrey h-[250px] w-[250px] flex justify-center items-center p-10 my-8 rounded-full'>
        <BeerCelebration />
      </div>
      <div className='flex flex-col items-center px-10 w-full'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Qui êtes vous ?
        </h1>
        <JoinForm />
        <div className='h-4'></div>
      </div>
    </div>
  );
};

export default Join;
