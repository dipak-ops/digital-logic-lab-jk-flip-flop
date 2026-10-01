/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LabProvider, useLab } from './context/LabContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { StudentModal } from './components/common/StudentModal';
import { HelpShortcutsModal } from './components/common/HelpShortcutsModal';
import { ToastContainer } from './components/common/ToastContainer';
import { ResetConfirmModal } from './components/common/ResetConfirmModal';

import { HomePage } from './components/pages/HomePage';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { AimPage } from './components/pages/AimPage';
import { TheoryPage } from './components/pages/TheoryPage';
import { OperationPage } from './components/pages/OperationPage';
import { IC7476Page } from './components/pages/IC7476Page';
import { ComponentsPage } from './components/pages/ComponentsPage';
import { ProcedurePage } from './components/pages/ProcedurePage';
import { WorkbenchPage } from './components/pages/WorkbenchPage';
import { SimulationPage } from './components/pages/SimulationPage';
import { TruthTablePage } from './components/pages/TruthTablePage';
import { TimingDiagramPage } from './components/pages/TimingDiagramPage';
import { DiagnosticsPage } from './components/pages/DiagnosticsPage';
import { QuizPage } from './components/pages/QuizPage';
import { VivaPage } from './components/pages/VivaPage';
import { ResultPage } from './components/pages/ResultPage';
import { ReportPage } from './components/pages/ReportPage';
import { CertificatePage } from './components/pages/CertificatePage';
import { HelpPage } from './components/pages/HelpPage';

import { HelpCircle } from 'lucide-react';

const LabContent: React.FC = () => {
  const { currentPage, theme, setShowHelpModal } = useLab();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'registration':
        return <RegistrationPage />;
      case 'aim':
        return <AimPage />;
      case 'theory':
        return <TheoryPage />;
      case 'operation':
        return <OperationPage />;
      case 'ic7476':
        return <IC7476Page />;
      case 'components':
        return <ComponentsPage />;
      case 'procedure':
        return <ProcedurePage />;
      case 'workbench':
        return <WorkbenchPage />;
      case 'simulation':
        return <SimulationPage />;
      case 'truthtable':
        return <TruthTablePage />;
      case 'timing':
        return <TimingDiagramPage />;
      case 'diagnostics':
        return <DiagnosticsPage />;
      case 'quiz':
        return <QuizPage />;
      case 'viva':
        return <VivaPage />;
      case 'result':
        return <ResultPage />;
      case 'report':
        return <ReportPage />;
      case 'certificate':
        return <CertificatePage />;
      case 'help':
        return <HelpPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Application Header */}
      <Header />

      {/* Main Layout Area */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-61px)]">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderActivePage()}
        </main>
      </div>

      {/* Floating Contextual Help (?) Button */}
      <button
        onClick={() => setShowHelpModal(true)}
        title="Digital Logic Signal & Pin Guide (?)"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-xl shadow-cyan-500/30 hover:scale-110 active:scale-95 transition no-print"
      >
        <span className="font-mono text-xl font-black">?</span>
      </button>

      {/* Modals & Alerts */}
      <StudentModal />
      <HelpShortcutsModal />
      <ResetConfirmModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LabProvider>
      <LabContent />
    </LabProvider>
  );
}
