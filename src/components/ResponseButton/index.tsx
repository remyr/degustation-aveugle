import cx from 'classnames';
import { FC, HTMLAttributes } from 'react';
import { BiWine } from 'react-icons/bi';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  selected?: boolean;
}

export const ResponseButton: FC<Props> = ({ text, selected, ...rest }) => {
  return (
    <button
      {...rest}
      className={cx(
        'flex justify-center items-center py-3 text-xl rounded-xl',
        {
          'text-darkBlue bg-white drop-shadow-response': !selected,
          'text-white bg-green-600 drop-shadow-selected': selected,
        }
      )}
    >
      <BiWine className='mr-4 w-5 h-5' />
      {text}
    </button>
  );
};
