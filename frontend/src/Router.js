import { memo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Recette from './pages/Recette';
import Recettes from './pages/Recettes';

const Redirect = memo(function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return null;
});

export default memo(function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect to="recettes" />} />
        <Route path="recettes">
          <Route index element={<Recettes />} />
          <Route path=":id" element={<Recette />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
