import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, SyntheticEvent } from 'react';

interface GenerateSessionModalProps {
  isOpen: boolean;
  generate: (rounds: number) => void;
  defaultRounds: number;
  close: () => void;
}

export const GenerateSessionModal: FC<GenerateSessionModalProps> = ({
  isOpen,
  generate,
  defaultRounds,
  close,
}) => {
  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      rounds: { value: number };
    };
    generate(target.rounds.value);
    close();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='overflow-y-auto fixed inset-0 z-10'
        onClose={close}
      >
        <div className='px-4 min-h-screen text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
          </Transition.Child>
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <form
              onSubmit={submitForm}
              className='inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform'
            >
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Nombre de rounds à créer
              </Dialog.Title>
              <div className='flex flex-col mt-2 space-y-4'>
                <input
                  className='border-darkBlue py-2 w-full rounded-lg border focus:border-darkBlue focus:ring-darkBlue'
                  type='number'
                  name='rounds'
                  placeholder='Nombre de round'
                  defaultValue={defaultRounds}
                  min={defaultRounds}
                />
              </div>

              <div className='flex justify-end mt-4 space-x-2'>
                <button
                  type='button'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  onClick={close}
                >
                  Annuler
                </button>
                <input
                  type='submit'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  value='Générer'
                />
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
