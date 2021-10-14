import { memo } from 'react';

const Container = ({ children, className }) => (
  <div className={`w-full max-w-screen-xl mx-auto ${className}`}>
    <div className="p-4">{children}</div>
  </div>
);
export default memo(Container);
