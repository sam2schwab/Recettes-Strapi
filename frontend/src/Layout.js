import { memo } from 'react';
import NavBar from './components/NavBar';
import Router from './Router';

export default memo(function Layout() {
  return (
    <div>
      <NavBar />
      <Router />
    </div>
  );
});
