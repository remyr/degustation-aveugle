import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineDuplicate,
  HiOutlinePlay,
} from 'react-icons/hi';

import { degustationCollection } from '@/models/Degustation';

import { Button } from '../Button';

export const DegustationButtonsList = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const [value, loading] = useDocument(doc(degustationCollection, id));
  const data = value?.data();

  return (
    <div className='flex flex-col mt-8 space-y-4'>
      <Button
        full
        icon={<HiOutlinePlay className='mr-3 w-6 h-6' />}
        text='Rejoindre la dégustation'
        onClick={() =>
          router.push({
            pathname: '/degustation/[id]/join',
            query: { id: value?.id },
          })
        }
        disabled={loading || !data?.started}
      />
      <Button
        full
        icon={<HiOutlineChartBar className='mr-3 w-6 h-6' />}
        text='Voir les résultats'
        disabled={loading || !data?.ended}
      />
      <Button
        full
        icon={<HiOutlineDuplicate className='mr-3 w-6 h-6' />}
        text='Copier le lien'
        disabled={loading}
      />
      <Button
        full
        icon={<HiOutlineCog className='mr-3 w-6 h-6' />}
        text='Configurer la dégustation'
        disabled={loading}
      />
    </div>
  );
};
