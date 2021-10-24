import { memo } from 'react';
import classNames from 'classnames';

const Button = ({ color = 'blue', textColor = 'white', ...props }) => (
  <button
    type="button"
    className={classNames(
      `bg-${color}-500`,
      `text-${textColor}`,
      'font-bold py-2 px-3 rounded-md',
      'flex items-center',
      props['disabled']
        ? 'cursor-not-allowed opacity-70'
        : `hover:bg-${color}-700`
    )}
    {...props}
  ></button>
);

export default memo(Button);
