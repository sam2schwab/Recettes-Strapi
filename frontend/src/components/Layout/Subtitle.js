import { memo } from 'react';

const Title = ({ children }) => <p className="text-3xl mb-3">{children}</p>;
export default memo(Title);
