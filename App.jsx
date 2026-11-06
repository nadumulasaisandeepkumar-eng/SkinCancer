import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Performance from './pages/Performance';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { ROUTES } from './config/routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PREDICT} element={<Predict />} />
          <Route path={ROUTES.PERFORMANCE} element={<Performance />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
