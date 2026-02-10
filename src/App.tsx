import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { MathGame } from './pages/math/MathGame';
import { TurkishGame } from './pages/turkish/TurkishGame';
import { LifeGame } from './pages/life/LifeGame';
import { ScienceGame } from './pages/science/ScienceGame';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="math" element={<MathGame />} />
          <Route path="turkish" element={<TurkishGame />} />
          <Route path="life" element={<LifeGame />} />
          <Route path="science" element={<ScienceGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
