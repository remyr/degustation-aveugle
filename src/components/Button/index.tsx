import cx from 'classnames';
import { FC, HTMLAttributes, ReactElement } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  full: boolean;
  icon?: ReactElement;
  disabled?: boolean;
  flat?: boolean;
}

export const Button: FC<Props> = ({
  text,
  full,
  icon,
  disabled,
  flat,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cx(
        'bg-darkBlue flex justify-center items-center py-3 text-white rounded-xl',
        {
          'w-full': full,
          'bg-darkBlue ': !disabled,
          'bg-[#D0C6D6] cursor-not-allowed': disabled,
          'drop-shadow-btn': !flat,
          'drop-shadow-disabled': !flat && disabled,
        }
      )}
    >
      {icon}
      {text}
    </button>
  );
};
