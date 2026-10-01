import React from 'react';
import { 
  Home, 
  User, 
  Target, 
  BookOpen, 
  Zap, 
  Cpu, 
  Layers, 
  ListOrdered, 
  Wrench, 
  Activity, 
  Table, 
  LineChart, 
  ShieldAlert, 
  HelpCircle, 
  MessageSquare, 
  Award, 
  FileText, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLab } from '../../context/LabContext';
import { NavPage } from '../../types/lab';

interface NavItem {
  id: NavPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category: 'Overview' | 'Practical Lab' | 'Assessment & Records';
}

export const Sidebar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    validation, 
    testCases, 
    quizScore, 
    quizSubmitted,
    diagnosticScore,
    vivaScore,
    student,
    isFullscreenLab
  } = useLab();

  if (isFullscreenLab) return null;

  const passedTestsCount = testCases.filter(t => t.passed).length;

  const navItems: NavItem[] = [
    // 1. Overview
    { id: 'home', label: '1. Home', icon: Home, category: 'Overview' },
    { id: 'registration', label: '2. Registration', icon: User, category: 'Overview', badge: student.isRegistered ? '✓' : undefined },
    { id: 'aim', label: '3. Aim', icon: Target, category: 'Overview' },
    { id: 'theory', label: '4. Theory', icon: BookOpen, category: 'Overview' },
    { id: 'operation', label: '5. Operation', icon: Zap, category: 'Overview' },
    { id: 'ic7476', label: '6. IC 7476', icon: Cpu, category: 'Overview' },
    { id: 'components', label: '7. Components', icon: Layers, category: 'Overview' },
    { id: 'procedure', label: '8. Procedure', icon: ListOrdered, category: 'Overview' },

    // 2. Practical Lab
    { id: 'workbench', label: '9. Workbench', icon: Wrench, category: 'Practical Lab', badge: `${validation.percent}%` },
    { id: 'simulation', label: '10. Simulation', icon: Activity, category: 'Practical Lab' },
    { id: 'truthtable', label: '11. Truth Table', icon: Table, category: 'Practical Lab', badge: `${passedTestsCount}/8` },
    { id: 'timing', label: '12. Timing Diagram', icon: LineChart, category: 'Practical Lab' },
    { id: 'diagnostics', label: '13. Diagnostics Lab', icon: ShieldAlert, category: 'Practical Lab', badge: diagnosticScore ? '15/15' : 'Test' },

    // 3. Assessment & Records
    { id: 'quiz', label: '14. Post-Test Quiz', icon: HelpCircle, category: 'Assessment & Records', badge: quizSubmitted ? `${quizScore}/10` : '10 Qs' },
    { id: 'viva', label: '15. Viva Voce', icon: MessageSquare, category: 'Assessment & Records', badge: `${vivaScore}/10` },
    { id: 'result', label: '16. Result Summary', icon: Award, category: 'Assessment & Records' },
    { id: 'report', label: '17. Lab Report', icon: FileText, category: 'Assessment & Records' },
    { id: 'certificate', label: '18. Certificate', icon: Sparkles, category: 'Assessment & Records' },
    { id: 'help', label: '19. Operator Guide', icon: HelpCircle, category: 'Assessment & Records' },
  ];

  // Dynamic Progress milestones
  const milestones = [
    { label: 'Registration', completed: student.isRegistered },
    { label: 'Theory', completed: true },
    { label: 'Circuit Assembly', completed: validation.isValid, extra: `${validation.percent}%` },
    { label: 'Verification', completed: passedTestsCount === 8, extra: `${passedTestsCount}/8` },
    { label: 'Timing Analysis', completed: true },
    { label: 'Fault Diagnosis', completed: diagnosticScore > 0, extra: `${diagnosticScore}/15` },
    { label: 'Quiz', completed: quizSubmitted, extra: quizSubmitted ? `${quizScore}/10` : 'Pending' },
    { label: 'Viva Voce', completed: vivaScore >= 5, extra: `${vivaScore}/10` },
    { label: 'Final Report', completed: validation.isValid && passedTestsCount === 8 && quizSubmitted }
  ];

  const totalCompleted = milestones.filter(m => m.completed).length;
  const overallPercent = Math.round((totalCompleted / milestones.length) * 100);

  const categories = ['Overview', 'Practical Lab', 'Assessment & Records'] as const;

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 bg-slate-950 text-slate-300 no-print">
      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
        {categories.map((cat) => (
          <div key={cat} className="space-y-1">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400/80">
              {cat}
            </div>
            {navItems.filter(i => i.category === cat).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`h-3.5 w-3.5 flex-shrink-0 transition ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {item.badge && (
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-medium ${
                        isActive ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="h-3 w-3 text-cyan-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Experiment Progress Tracker at Bottom */}
      <div className="border-t border-slate-800 bg-slate-900/70 p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Experiment Progress
          </span>
          <span className="font-mono text-xs font-bold text-slate-200">
            {overallPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        {/* Dynamic Checklist */}
        <div className="space-y-1 text-[11px] max-h-36 overflow-y-auto pr-1">
          {milestones.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between rounded px-2 py-0.5 ${
                m.completed 
                  ? 'text-emerald-300 bg-emerald-950/20' 
                  : 'text-slate-400 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-1.5 truncate">
                <div className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] ${
                  m.completed ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-600 text-slate-600'
                }`}>
                  {m.completed ? <Check className="h-2 w-2 stroke-[3]" /> : '•'}
                </div>
                <span className="truncate">{m.label}</span>
              </div>
              {m.extra && <span className="font-mono text-[9px] text-slate-400 ml-1">{m.extra}</span>}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
