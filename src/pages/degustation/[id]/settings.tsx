import { Configuration } from '@/components/Configuration';

const SettingsPage = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-48 bg-white shadow-sm'>
        <h1 className='px-8 text-3xl font-semibold text-center text-black'>
          Configuration de la dégustation
        </h1>
      </div>
      <Configuration />
    </div>
  );
};

export default SettingsPage;
