import { memo } from 'react';

const Badge = ({ children }) => (
  <span className="bg-gray-500 text-white px-2 py-1 text-xs font-bold rounded mr-1">
    {children}
  </span>
);
export default memo(Badge);
