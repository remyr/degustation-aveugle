import { SettingsButtons } from '@/components/SettingsButtons/SettingsButtons';
import { SettingsTable } from '@/components/SettingsTable';

const SettingsPage = () => {
  return (
    <div>
      <div className='flex justify-center items-center h-48 bg-white shadow-sm'>
        <h1 className='px-8 text-3xl font-semibold text-center text-black'>
          Configuer la dégustation
        </h1>
      </div>
      <SettingsButtons />
      <SettingsTable />
    </div>
  );
};

export default SettingsPage;
