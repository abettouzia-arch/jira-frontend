import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileJson,
  FileText,
  Loader2,
  LogOut,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from 'lucide-react';

import { FileUploader } from '../../shared/components/FileUploader';
import { useJobStatus } from '../../hooks/useJobStatus';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../core/api';

const API_BASE_URL = 'http://docker.itspectrum.fr:88/api';

export const AnalysisPage: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);

  const jobStatus = useJobStatus(jobId);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const result = jobStatus?.result;
  const summary = result?.summary;
  const reportId = result?.report_id;

  const progress = useMemo(() => {
    if (!jobStatus?.status) return 10;
    if (jobStatus.status === 'QUEUED') return 25;
    if (jobStatus.status === 'RUNNING') return 65;
    if (jobStatus.status === 'COMPLETED') return 100;
    if (jobStatus.status === 'FAILED') return 100;
    return 40;
  }, [jobStatus?.status]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetAnalysis = () => {
    setJobId(null);
  };

  const openReport = () => {
    if (reportId) {
      navigate(`/reports/${reportId}`);
    }
  };

  const downloadJson = () => {
    if (reportId) {
      window.open(`${API_BASE_URL}/reports/${reportId}/json`, '_blank');
    }
  };

  // Exemple pour le PDF dans AnalysisPage.tsx
  const downloadPdf = async () => {
    if (reportId) {
      const response = await api.get(`/reports/${reportId}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-[var(--spectrum-blue)] transition-colors font-bold"
          >
            <ArrowLeft size={18} />
            Retour Overview
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={resetAnalysis}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Nouvelle analyse
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <section className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--spectrum-blue)] mb-3">
            Jira Cloud Migration Assistant
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Analyse de compatibilité
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            Déposez un export Jira Data Center. Le pipeline va exécuter le parsing,
            l’analyse de compatibilité, l’enrichissement RAG et la génération du rapport IA.
          </p>
        </section>

        {!jobId ? (
          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-8 border border-slate-100 dark:border-slate-800">
              <div className="mb-6">
                <h2 className="text-2xl font-black mb-2">Nouvelle analyse</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Importez votre fichier ZIP/XML/Groovy/Dump pour lancer le pipeline complet.
                </p>
              </div>

              <FileUploader onUploadSuccess={(id) => setJobId(id)} />
            </div>

            <div className="space-y-5">
              <InfoCard
                title="Pipeline automatisé"
                description="Gateway → Worker → Parsing → Compatibility → Report"
                icon={<Clock size={20} />}
              />
              <InfoCard
                title="Analyse hybride"
                description="Règles déterministes, RAG documentaire et IA Gemini"
                icon={<ShieldAlert size={20} />}
              />
              <InfoCard
                title="Exports"
                description="Rapports JSON et PDF téléchargeables"
                icon={<FileText size={20} />}
              />
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg p-8 border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-2xl font-black mb-2">Suivi du job</h2>
                  <p className="text-xs text-slate-400 font-mono break-all">
                    Job ID: {jobId}
                  </p>
                </div>

                <StatusBadge status={jobStatus?.status} />
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${
                    jobStatus?.status === 'FAILED'
                      ? 'bg-red-500'
                      : jobStatus?.status === 'COMPLETED'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                {!jobStatus && 'Initialisation du suivi...'}
                {jobStatus?.status === 'QUEUED' && 'Job en attente de traitement.'}
                {jobStatus?.status === 'RUNNING' && 'Analyse en cours...'}
                {jobStatus?.status === 'COMPLETED' && 'Analyse terminée avec succès.'}
                {jobStatus?.status === 'FAILED' && (
                  <span className="text-red-500 font-bold">
                    Échec : {jobStatus.error || result?.error || 'Erreur inconnue'}
                  </span>
                )}
              </div>
            </div>

            {jobStatus?.status !== 'COMPLETED' && jobStatus?.status !== 'FAILED' && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-6 flex items-center gap-4">
                <Loader2 className="animate-spin text-blue-600" size={24} />
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-200">
                    Traitement en cours
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Le job est vérifié automatiquement toutes les 3 secondes.
                  </p>
                </div>
              </div>
            )}

            {jobStatus?.status === 'FAILED' && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="text-red-600" size={28} />
                  <div>
                    <h3 className="text-xl font-black text-red-700 dark:text-red-300 mb-2">
                      Analyse échouée
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Vérifiez les logs du worker/parsing_service puis relancez une nouvelle analyse.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {jobStatus?.status === 'COMPLETED' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <StatCard
                    label="Score migration"
                    value={`${summary?.migration_score ?? 0}/100`}
                    tone="blue"
                  />
                  <StatCard
                    label="Blockers"
                    value={summary?.blocker_count ?? 0}
                    tone="red"
                  />
                  <StatCard
                    label="Composants"
                    value={summary?.total_components ?? 0}
                    tone="slate"
                  />
                  <StatCard
                    label="IA Report"
                    value={result?.report?.ai_used ? 'Oui' : 'Non'}
                    tone="green"
                  />
                </div>

                <div className="bg-gradient-to-br from-indigo-950 to-blue-800 rounded-[2rem] p-8 text-white shadow-xl">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="text-green-300" size={28} />
                        <h3 className="text-3xl font-black">Analyse terminée</h3>
                      </div>

                      <p className="text-blue-100 leading-relaxed mb-6">
                        {summary?.migration_recommendation ||
                          "Le rapport de compatibilité a été généré avec succès."}
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <MetaItem label="Analysis ID" value={result?.analysis_id} />
                        <MetaItem label="Matrix ID" value={result?.matrix_id} />
                        <MetaItem label="Report ID" value={result?.report_id} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[220px]">
                      <button
                        onClick={openReport}
                        disabled={!reportId}
                        className="px-6 py-3 rounded-xl bg-white text-blue-950 font-black hover:bg-slate-100 transition-all disabled:opacity-50"
                      >
                        Voir le rapport
                      </button>

                      <button
                        onClick={downloadPdf}
                        disabled={!reportId}
                        className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FileText size={18} />
                        Télécharger PDF
                      </button>

                      <button
                        onClick={downloadJson}
                        disabled={!reportId}
                        className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FileJson size={18} />
                        Télécharger JSON
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

const StatusBadge = ({ status }: { status?: string }) => {
  const label = status || 'INITIALIZING';

  const className =
    label === 'COMPLETED'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      : label === 'FAILED'
        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 animate-pulse';

  return (
    <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
};

const StatCard = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: 'blue' | 'red' | 'green' | 'slate';
}) => {
  const toneClass = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  }[tone];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-3">
        {label}
      </p>
      <div className={`inline-flex px-4 py-2 rounded-xl font-black text-2xl ${toneClass}`}>
        {value}
      </div>
    </div>
  );
};

const InfoCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-black mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const MetaItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
    <p className="text-[10px] uppercase tracking-widest text-blue-200 font-black mb-1">
      {label}
    </p>
    <p className="text-xs font-mono break-all text-white/90">
      {value || '-'}
    </p>
  </div>
);