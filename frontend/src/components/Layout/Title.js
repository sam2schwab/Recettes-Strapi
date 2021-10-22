import { memo } from 'react';

const Title = ({ children }) => (
  <div className="flex items-center text-5xl mb-5">{children}</div>
);
export default memo(Title);
