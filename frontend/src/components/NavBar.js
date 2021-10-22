import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname == to;
  return (
    <Link
      className={classNames(
        'font-semibold text-gray-500 mr-4 hover:text-black',
        active && 'font-bold'
      )}
      to={to}
    >
      {children}
    </Link>
  );
};

export default memo(function NavBar() {
  return (
    <div className="w-full bg-gray-200 ">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center">
        <NavLink to="/recettes">Recettes</NavLink>
        <NavLink to="/epicerie">Liste d&apos;épicerie</NavLink>
      </div>
    </div>
  );
});
