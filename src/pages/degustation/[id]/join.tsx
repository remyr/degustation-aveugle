import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import { Button } from '@/components/Button';
import { BeerCelebration } from '@/components/Undraw/BeerCelebration';

const Join = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-darkGrey h-[250px] w-[250px] flex justify-center items-center p-10 my-8 rounded-full'>
        <BeerCelebration />
      </div>
      <div className='flex flex-col items-center px-10 w-full'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Qui êtes vous ?
        </h1>
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
            disabled={name === ''}
            flat
            onClick={() =>
              router.push({
                pathname: '/session/abc123/game',
                query: {
                  bottle: 1,
                },
              })
            }
          />

          <div className='h-4'></div>
        </div>
        <div className='h-4'></div>
      </div>
    </div>
  );
};

export default Join;
