import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryDashboard } from './pages/CategoryDashboard';
import { SpaceLayout } from './components/layout/SpaceLayout';
import { MathGame } from './pages/math/MathGame';
import { TurkishGame } from './pages/turkish/TurkishGame';
import { ScienceGame } from './pages/science/ScienceGame';
import { SocialGame } from './pages/social/SocialGame';
import { LifeGame } from './pages/life/LifeGame';
import { ReligionGame } from './pages/religion/ReligionGame';
import { EnglishGame } from './pages/english/EnglishGame';
import { LegoBuilderGame } from './pages/lego/LegoBuilderGame';

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
          <Route path="/english" element={<EnglishGame />} />
          <Route path="/lego-builder" element={<LegoBuilderGame />} />
        </Routes>
      </SpaceLayout>
    </BrowserRouter>
  );
}

export default App;
