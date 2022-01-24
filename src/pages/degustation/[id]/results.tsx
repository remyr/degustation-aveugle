import { useRouter } from 'next/router';

import { Results } from '@/components/Results';
import { Winner } from '@/components/Splash/Winner';

const ResultPage = () => {
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
    <div className='flex flex-col justify-center items-center mx-auto w-full max-w-lg'>
      <div
        onClick={goToHomeSession}
        className='h-[250px] w-[250px] flex justify-center items-center hover:cursor-pointer'
      >
        <Winner />
      </div>
      <Results />
    </div>
  );
};

export default ResultPage;
