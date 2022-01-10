import cx from 'classnames';
import { FC } from 'react';

interface Props {
  total: number;
  current: number;
}

export const Step: FC<Props> = ({ total, current }) => {
  return (
    <div className='space-around flex mt-4 space-x-1 w-full'>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={`step-${index}`}
          className={cx('flex-1 h-2 rounded-sm', {
            'bg-darkBlue': index + 1 <= current,
            'bg-darkBlue opacity-10': index + 1 > current,
          })}
        ></div>
      ))}
    </div>
  );
};
