import { memo } from 'react';

const SearchBar = (props) => (
  <input
    type="search"
    className="w-full rounded-md border-gray-400 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
    {...props}
  />
);
export default memo(SearchBar);
