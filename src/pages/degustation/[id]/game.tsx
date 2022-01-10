import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import { Button } from '@/components/Button';
import { ResponseButton } from '@/components/ResponseButton';
import { UndrawWine } from '@/components/Undraw/Wine';

const Game = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className='flex flex-col items-center'>
      <div className='bg-darkGrey h-[200px] w-[200px] flex justify-center items-center p-6 my-8 rounded-full'>
        <UndrawWine />
      </div>
      <div className='flex flex-col flex-1 justify-around items-center px-10 pb-10 w-full'>
        <div className='flex flex-col items-center w-full'>
          <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
            Bouteille #1
          </h1>
          {/* <Step total={15} current={4} /> */}
        </div>
        <div className='flex flex-col space-y-8 w-full'>
          <ResponseButton
            text='Vin blanc'
            onClick={() => setSelected(1)}
            selected={selected === 1}
          />
          <ResponseButton
            text='Vin rosé'
            onClick={() => setSelected(2)}
            selected={selected === 2}
          />
          <ResponseButton
            text='Vin rouge'
            onClick={() => setSelected(3)}
            selected={selected === 3}
          />
        </div>
        <div className='flex flex-col mt-8 w-full'>
          <Button
            full
            icon={<HiArrowRight className='mr-3 w-6 h-6' />}
            text='Bouteille suivante'
            disabled={selected === null}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
