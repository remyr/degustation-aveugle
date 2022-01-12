import { useRouter } from 'next/router';

import { GameForm } from '@/components/GameForm';
import { UndrawWine } from '@/components/Undraw/Wine';

const Game = () => {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='bg-darkGrey h-[200px] w-[200px] flex justify-center items-center p-6 my-8 rounded-full'>
        <UndrawWine />
      </div>
      <GameForm />
    </div>
  );
};

export default Game;
