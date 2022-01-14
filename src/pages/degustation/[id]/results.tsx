import { useRouter } from 'next/router';
import { BiTrophy } from 'react-icons/bi';

import { Results } from '@/components/Results';

const ResultPage = () => {
  const router = useRouter();
  const id = router.query.id;

  if (!id) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='border-[15px] h-[200px] w-[200px] flex justify-center items-center my-8 mt-12 bg-white rounded-full border-yellow-500'>
        <BiTrophy className='h-[120px] text-darkBlue w-[120px]' />
      </div>
      <Results />
    </div>
  );
};

export default ResultPage;
