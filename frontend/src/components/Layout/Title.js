import { memo } from 'react';

const Title = ({ children, className }) => (
  <p className={`text-5xl mb-5 ${className}`}>{children}</p>
);
export default memo(Title);
