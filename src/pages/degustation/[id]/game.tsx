import { useRouter } from 'next/router';

import { GameForm } from '@/components/GameForm';
import { Waiter } from '@/components/Splash/Waiter';

const Game = () => {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }

  return (
    <div className='flex flex-col items-center mx-auto mt-8 max-w-lg'>
      <div className='h-[250px] w-[250px] flex justify-center items-center p-4'>
        <Waiter />
      </div>
      <div className='mt-8 w-full'>
        <GameForm />
      </div>
    </div>
  );
};

export default Game;
