import { memo } from 'react';
import classNames from 'classnames';

const Table = ({ children }) => (
  <table className="table-auto border-separate border-spacing-0 w-full">
    {children}
  </table>
);
export default memo(Table);

export const TableHeaderRow = memo(function TableHeaderRow({ children }) {
  return (
    <thead className="text-left">
      <tr>{children}</tr>
    </thead>
  );
});

export const TableHeader = memo(function TableHeader({ children }) {
  return <th className="p-2 font-bold">{children}</th>;
});

export const TableRow = memo(function TableRow({
  children,
  onClick,
  clickable = false,
}) {
  return (
    <tr
      className={classNames(
        clickable && 'rounded-md hover:bg-gray-100 cursor-pointer'
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
});

export const TableCell = memo(function TableCell({ children }) {
  return (
    <td className="p-2 first:rounded-l-md last:rounded-r-md">{children}</td>
  );
});
