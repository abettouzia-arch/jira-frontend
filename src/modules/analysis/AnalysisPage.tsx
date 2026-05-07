import React, { useState } from 'react';
import { FileUploader } from '../../shared/components/FileUploader';
import { useJobStatus } from '../../hooks/useJobStatus';

export const AnalysisPage: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const jobStatus = useJobStatus(jobId);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Jira Migration <span className="text-blue-600">Assistant</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">Analyseur de compatibilité et rapports IA</p>
        </div>

        {!jobId ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Nouvelle Analyse</h2>
              <p className="text-slate-500 text-sm">Préparez votre migration en analysant votre export Data Center ou Server.</p>
            </div>
            <FileUploader onUploadSuccess={(id) => setJobId(id)} />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-700">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Suivi en temps réel</h2>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  jobStatus?.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                  jobStatus?.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700 animate-pulse'
                }`}>
                  {jobStatus?.status || 'Initialisation'}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  jobStatus?.status === 'COMPLETED' ? 'w-full bg-green-500' : 'w-2/3 bg-blue-500'
                }`}></div>
              </div>
              <p className="text-xs text-slate-400 font-mono">Job ID: {jobId}</p>
            </div>

            {/* Results Section */}
            {jobStatus?.status === 'COMPLETED' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-1000">
                <StatCard label="Projets" value={jobStatus.result?.raw_stats?.project_count} icon="📁" />
                <StatCard label="Tickets" value={jobStatus.result?.raw_stats?.issue_count} icon="🎫" />
                <StatCard label="Utilisateurs" value={jobStatus.result?.raw_stats?.user_count} icon="👥" />
                
                <div className="md:col-span-3 bg-gradient-to-br from-indigo-900 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Analyse terminée avec succès</h3>
                      <p className="text-indigo-100 opacity-90">L'IA a généré votre rapport de compatibilité personnalisé.</p>
                    </div>
                    <button className="bg-white text-blue-900 font-black px-8 py-4 rounded-xl shadow-white/10 shadow-2xl hover:bg-slate-100 transition-transform active:scale-95 whitespace-nowrap">
                      VOIR LE RAPPORT COMPLET
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Petit sous-composant pour les cartes de stats
const StatCard = ({ label, value, icon }: { label: string, value: any, icon: string }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
    <div className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-black text-slate-800">{value ?? '0'}</p>
    </div>
  </div>
);