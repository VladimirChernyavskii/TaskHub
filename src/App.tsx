import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
