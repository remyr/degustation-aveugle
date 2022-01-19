import { addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  HiOutlineDocumentText,
  HiOutlinePlay,
  HiOutlinePlusCircle,
} from 'react-icons/hi';

import { Bottle, bottleCollection } from '@/models/Bottle';

import { CreateBottleModal } from './CreateBottleModal';
import { Button } from '../Button';

export const SettingsButtons = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const id = router.query.id as string;

  const createBottle = async (data: Bottle) => {
    if (!id) return;

    await addDoc(bottleCollection(id), data);

    setModalOpen(false);
  };

  return (
    <div className='flex flex-col px-6 mt-8 space-y-4'>
      <Button
        icon={<HiOutlinePlusCircle className='mr-1 text-xl' />}
        onClick={() => setModalOpen(true)}
        text='Ajouter une bouteille'
        full
      />
      <Button
        icon={<HiOutlineDocumentText className='mr-1 text-xl' />}
        text='Générer une dégustation'
        full
      />
      <Button
        icon={<HiOutlinePlay className='mr-1 text-xl' />}
        text='Démarrer la session'
        full
      />
      <CreateBottleModal
        isOpen={isModalOpen}
        close={() => setModalOpen(false)}
        submit={createBottle}
      />
    </div>
  );
};
