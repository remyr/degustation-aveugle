import { useRouter } from 'next/router';

import { JoinForm } from '@/components/JoinForm';
import { SessionGroup } from '@/components/Splash/SessionGroup';

const Join = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

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
    <div className='flex flex-col justify-around items-center mt-12'>
      <div
        onClick={goToHomeSession}
        className='h-[250px] w-[250px] flex justify-center items-center p-4 hover:cursor-pointer'
      >
        <SessionGroup />
      </div>
      <div className='flex flex-col items-center px-10 mt-4 w-full max-w-md'>
        <h1 className='flex items-center text-4xl font-semibold text-center text-black'>
          Qui êtes vous ?
        </h1>
        <JoinForm />
      </div>
    </div>
  );
};

export default Join;
