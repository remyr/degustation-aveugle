import { useRouter } from 'next/router';

import { Configuration } from '@/components/Configuration';
import { Settings } from '@/components/Splash/Settings';

const SettingsPage = () => {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }

  const goToHomeSession = () => {
    if (!id) return;

    router.push({
      pathname: '/degustation/[id]/',
      query: { id },
    });
  };
  return (
    <div className='flex flex-col justify-around items-center mx-auto w-full max-w-lg'>
      <div
        onClick={goToHomeSession}
        className='h-[250px] w-[250px] flex justify-center items-center p-4 hover:cursor-pointer'
      >
        <Settings />
      </div>
      <div className='w-full'>
        <Configuration />
      </div>
    </div>
  );
};

export default SettingsPage;
