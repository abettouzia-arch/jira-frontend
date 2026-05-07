import { useState } from 'react';
import logoSpectrum from '../../assets/img/logo-spectrum-groupe.png';
import LoginModal from '../auth/LoginModal';
import { Sun, Moon, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <img src={logoSpectrum} alt="Logo" className={`h-10 transition-all ${darkMode ? 'brightness-200' : ''}`} />
          
          <div className="flex items-center gap-6">
            <button onClick={toggleDarkMode} className="text-slate-600 dark:text-yellow-400">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-[var(--spectrum-blue)] text-white font-bold rounded-full hover:shadow-lg transition-all active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Simplifiez votre migration <br/>
            <span className="text-[var(--spectrum-blue)] dark:text-blue-500 text-6xl md:text-8xl">Jira Cloud.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
            Analysez la compatibilité de vos instances, identifiez les risques et générez des rapports d'IA complets en quelques clics.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"
            >
              Démarrer l'analyse
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* FEATURES GRID (Pour le côté pro) */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              { icon: <Zap className="text-yellow-500"/>, title: "Rapide", desc: "Traitement haute performance de vos fichiers ZIP/XML." },
              { icon: <Shield className="text-green-500"/>, title: "Sécurisé", desc: "Vos données sont traitées localement et protégées." },
              { icon: <BarChart3 className="text-blue-500"/>, title: "Précis", desc: "Analyse granulaire de chaque projet et ticket." }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-left hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">{feature.icon}</div>
                <h3 className="text-xl font-bold dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">
        © 2026 Spectrum Groupe • Intelligence de Migration
      </footer>

      {/* MODAL */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;