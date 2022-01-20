import { doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import absoluteUrl from 'next-absolute-url';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  const [copyText, setCopyText] = useState('Copier le lien');
  const id = router?.query?.id as string;

  const [value, loading] = useDocument(doc(degustationCollection, id));
  const data = value?.data();

  const textToCopy = () => {
    const { origin } = absoluteUrl();

    const urlToCopy = `${origin}/degustation/${id}`;

    return urlToCopy;
  };

  return (
    <div className='flex flex-col pb-8 mt-8 space-y-4'>
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
        onClick={() =>
          router.push({
            pathname: '/degustation/[id]/results',
            query: { id: value?.id },
          })
        }
      />
      <CopyToClipboard
        text={textToCopy()}
        onCopy={() => {
          setCopyText('Lien copié');
          setTimeout(() => {
            setCopyText('Copier le lien');
          }, 2000);
        }}
      >
        <Button
          full
          icon={<HiOutlineDuplicate className='mr-3 w-6 h-6' />}
          text={copyText}
          disabled={loading}
        />
      </CopyToClipboard>
      <Button
        full
        icon={<HiOutlineCog className='mr-3 w-6 h-6' />}
        text='Configurer la dégustation'
        disabled={loading}
        onClick={() =>
          router.push({
            pathname: '/degustation/[id]/settings',
            query: { id: value?.id },
          })
        }
      />
    </div>
  );
};
