import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryDashboard } from './pages/CategoryDashboard';
import { SpaceLayout } from './components/layout/SpaceLayout';
import { MathGame } from './pages/math/MathGame';
import { TurkishGame } from './pages/turkish/TurkishGame';
import { ScienceGame } from './pages/science/ScienceGame';
import { SocialGame } from './pages/social/SocialGame';
import { LifeGame } from './pages/life/LifeGame';
import { ReligionGame } from './pages/religion/ReligionGame';

function App() {
  return (
    <BrowserRouter basename="/uzay-akademisi">
      <SpaceLayout>
        <Routes>
          <Route path="/" element={<CategoryDashboard />} />
          <Route path="/math" element={<MathGame />} />
          <Route path="/turkish" element={<TurkishGame />} />
          <Route path="/science" element={<ScienceGame />} />
          <Route path="/social" element={<SocialGame />} />
          <Route path="/life" element={<LifeGame />} />
          <Route path="/religion" element={<ReligionGame />} />
        </Routes>
      </SpaceLayout>
    </BrowserRouter>
  );
}

export default App;
