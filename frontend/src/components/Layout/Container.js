import { memo } from 'react';

const Container = ({ children }) => (
  <div className="w-full max-w-screen-xl mx-auto">
    <div className="p-4">{children}</div>
  </div>
);
export default memo(Container);
