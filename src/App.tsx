import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Home from './modules/overview/Home';
import Login from './modules/auth/Login';
import { AnalysisPage } from './modules/analysis/AnalysisPage';

function App() {
  const token = useAuthStore((state) => state.token);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* La Home est TOUJOURS accessible, que l'on soit connecté ou non.
            On ne redirige plus l'utilisateur vers /analysis automatiquement.
          */}
          <Route path="/" element={<Home />} />
          
          {/* Route d'analyse protégée :
            L'utilisateur ne peut y accéder que s'il a un token.
            S'il n'est pas connecté, il est renvoyé vers la Home pour ouvrir la modal.
          */}
          <Route 
            path="/analysis" 
            element={token ? <AnalysisPage /> : <Navigate to="/" />} 
          />

          {/* Route /login (optionnelle) :
            Si l'utilisateur est déjà connecté, on le renvoie à la Home.
          */}
          <Route 
            path="/login" 
            element={token ? <Navigate to="/" /> : <Login />} 
          />

          {/* Redirection 404 vers la Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;