import { memo } from 'react';

const Title = ({ children }) => (
  <p className="flex items-center text-5xl mb-5">{children}</p>
);
export default memo(Title);
