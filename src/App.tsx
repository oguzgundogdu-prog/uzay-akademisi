import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { MathGame } from './pages/math/MathGame';
import { TurkishGame } from './pages/turkish/TurkishGame';
import { ScienceGame } from './pages/science/ScienceGame';
import { SocialGame } from './pages/social/SocialGame';
import { LifeGame } from './pages/life/LifeGame';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space-dark text-white font-sans selection:bg-neon-blue selection:text-black">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/math" element={<MathGame />} />
            <Route path="/turkish" element={<TurkishGame />} />
            <Route path="/science" element={<ScienceGame />} />
            <Route path="/social" element={<SocialGame />} />
            <Route path="/life" element={<LifeGame />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
