import { addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import {
  HiOutlineDocumentText,
  HiOutlinePlay,
  HiOutlinePlusCircle,
} from 'react-icons/hi';

import { Bottle, bottleCollection } from '@/models/Bottle';

import { CreateBottleModal } from './CreateBottleModal';
import { Button } from '../Button';

interface SettingsButtonsProps {
  addButtonDisabled?: boolean;
  startButtonDisabled?: boolean;
  generateButtonDisabled?: boolean;
  generateSession: () => void;
  startSession: () => void;
}

export const SettingsButtons: FC<SettingsButtonsProps> = ({
  addButtonDisabled,
  startButtonDisabled,
  generateButtonDisabled,
  generateSession,
  startSession,
}) => {
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
        disabled={addButtonDisabled}
      />
      <Button
        icon={<HiOutlineDocumentText className='mr-1 text-xl' />}
        text='Générer une dégustation'
        full
        disabled={generateButtonDisabled}
        onClick={generateSession}
      />
      <Button
        icon={<HiOutlinePlay className='mr-1 text-xl' />}
        text='Démarrer la session'
        full
        onClick={startSession}
        disabled={startButtonDisabled}
      />
      <CreateBottleModal
        isOpen={isModalOpen}
        close={() => setModalOpen(false)}
        submit={createBottle}
      />
    </div>
  );
};
