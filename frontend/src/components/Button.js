import { memo } from 'react';
import classNames from 'classnames';

const BackButton = ({ color = 'blue', textColor = 'white', ...props }) => (
  <button
    type="button"
    className={classNames(
      `bg-${color}-500 hover:bg-${color}-700`,
      `text-${textColor}`,
      'font-bold py-2 px-3 rounded-md',
      'flex items-center'
    )}
    {...props}
  ></button>
);

export default memo(BackButton);
