import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  LogOut,
  UploadCloud,
  FileText,
  Brain,
} from 'lucide-react';

import logoSpectrum from '../../assets/img/logo-spectrum-groupe.png';
import LoginModal from '../auth/LoginModal';
import { useAuthStore } from '../../store/useAuthStore';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const toggleDarkMode = () => {
    setDarkMode((previous) => !previous);
    document.documentElement.classList.toggle('dark');
  };

  const handleMainAction = () => {
    if (isAuthenticated) {
      navigate('/analysis');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500 font-sans">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-20 top-80 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
        </div>
      <nav className="fixed top-0 w-full z-40 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img
              src={logoSpectrum}
              alt="Spectrum Groupe"
              className={`h-10 transition-all ${darkMode ? 'brightness-200' : ''}`}
            />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Changer le thème"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/analysis')}
                  className="px-5 py-2.5 bg-[var(--spectrum-blue)] text-white font-bold rounded-full hover:shadow-lg transition-all active:scale-95"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-all"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-[var(--spectrum-blue)] text-white font-bold rounded-full hover:shadow-lg transition-all active:scale-95"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <section className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[var(--spectrum-blue)] dark:text-blue-300 text-sm font-bold mb-6 border border-blue-100 dark:border-blue-900">
                <Brain size={16} />
                Assistant IA pour migration Jira Data Center vers Cloud
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Simplifiez votre migration <br />
                <span className="text-[var(--spectrum-blue)] dark:text-blue-400">Jira Cloud</span> sans surprises.
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-slate-600 dark:text-slate-400 mt-6 leading-8">
                Analysez vos exports Jira Data Center, détectez les incompatibilités, enrichissez les résultats avec RAG et générez des rapports IA prêts à exploiter.
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 mt-10">
                <button
                  onClick={handleMainAction}
                  className="group px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  {isAuthenticated ? "Accéder à l'analyse" : "Démarrer l'analyse"}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/90 text-slate-900 font-bold rounded-2xl border border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Voir les fonctionnalités
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">
                    Résumé rapide
                  </p>
                  <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-7">
                    Une analyse structurée de vos exports pour détecter les risques, préparer les rapports et piloter la migration.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">
                    Avantages clés
                  </p>
                  <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300 text-sm leading-7">
                    <li>Analyse complète du contenu Jira</li>
                    <li>Recommandations priorisées</li>
                    <li>Rapports prêts à partager</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 shadow-2xl shadow-slate-900/10 p-8">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-semibold">
                      Aperçu de la migration
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                      Contrôle, prédiction et recommandations
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm font-semibold">
                    <Zap size={16} /> Instantané
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 font-bold">
                      Données analysées
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">98%</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Couverture des éléments Jira détectés dans votre export.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 font-semibold">
                        Règles actives
                      </p>
                      <p className="mt-3 text-xl font-bold text-slate-900 dark:text-white">72</p>
                    </div>
                    <div className="rounded-3xl bg-slate-100 dark:bg-slate-900 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 font-semibold">
                        Rapports prêts
                      </p>
                      <p className="mt-3 text-xl font-bold text-slate-900 dark:text-white">PDF + JSON</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Diagnostiquez automatiquement les dangers et blocages, puis obtenez des recommandations claires pour chaque étape.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50/80 to-slate-50/80 dark:from-slate-900 dark:to-slate-950 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500 font-semibold">
                  Impact projet
                </p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-3xl bg-white dark:bg-slate-900 p-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">+40% productivité</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gagnez du temps en consolidant l'analyse et les recommandations.</p>
                  </div>
                  <div className="rounded-3xl bg-white dark:bg-slate-900 p-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">-60% de temps perdu</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Réduisez les cycles de préparation et d'investigation manuelle.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="features" className="mt-24 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-semibold mb-4">
              Ce que vous obtenez
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white max-w-3xl mx-auto">
              Une vue opérationnelle complète de votre migration Jira.
            </h2>
          </section>

          <div className="grid gap-6 lg:grid-cols-3 mt-10">
            {[
              {
                icon: <UploadCloud className="text-blue-500" />,
                title: 'Upload simple',
                desc: 'Importez vos exports ZIP/XML/Groovy et lancez une analyse complète en un clic.',
              },
              {
                icon: <Shield className="text-green-500" />,
                title: 'Analyse fiable',
                desc: 'Détection des risques via règles déterministes, RAG documentaire et raisonnement IA.',
              },
              {
                icon: <FileText className="text-orange-500" />,
                title: 'Rapports exploitables',
                desc: 'Générez des rapports JSON/PDF avec score, blockers, recommandations et synthèse IA.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-white dark:bg-slate-800/70 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-left hover:border-blue-500/40 hover:-translate-y-1 transition-all shadow-sm"
              >
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Zap size={20} />,
                label: 'Étape 1',
                title: 'Importez votre export',
                text: 'ZIP, XML ou Groovy – l’outil analyse l’architecture complète de votre Jira.',
              },
              {
                icon: <BarChart3 size={20} />,
                label: 'Étape 2',
                title: 'Détectez les points critiques',
                text: 'Blocages, dépendances et données incompatibles sont priorisés automatiquement.',
              },
              {
                icon: <Brain size={20} />,
                label: 'Étape 3',
                title: 'Générez des actions',
                text: 'Rapports clairs et recommandations IA pour piloter la migration sans surprise.',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 shadow-sm">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-300 mb-5 shadow-sm">
                  {item.icon}
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-semibold mb-3">
                  {item.label}
                </p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </section>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">
        © 2026 Spectrum Groupe • Jira Cloud Migration Intelligence
      </footer>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;