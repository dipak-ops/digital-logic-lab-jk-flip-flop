import React, { useState } from 'react';
import { User, Hash, Building, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLab } from '../../context/LabContext';

export const RegistrationPage: React.FC = () => {
  const { student, updateStudent, setCurrentPage } = useLab();

  const [formData, setFormData] = useState({
    name: student.name || '',
    rollNumber: student.rollNumber || '',
    college: student.college || '',
    branch: student.branch || '',
    semester: student.semester || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Student Name is required';
    if (!formData.rollNumber.trim()) errs.rollNumber = 'Roll/ID Number is required';
    if (!formData.college.trim()) errs.college = 'College/University is required';
    if (!formData.branch.trim()) errs.branch = 'Department/Branch is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    updateStudent(formData);
    setCurrentPage('aim');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          <User className="h-3.5 w-3.5" />
          <span>STUDENT REGISTRATION</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Laboratory Student Dossier
        </h1>
        <p className="text-sm text-slate-400">
          Please register your candidate credentials. This information is saved locally in your browser and automatically generates your official Laboratory Report and Certificate of Completion.
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Student Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priyanshu Sharma"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Roll Number / ID *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  placeholder="e.g. EC-2026-042"
                  className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                    errors.rollNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                  }`}
                />
              </div>
              {errors.rollNumber && <p className="text-[11px] text-rose-400 mt-1">{errors.rollNumber}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Semester / Class
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  placeholder="e.g. 4th Semester"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              College / University *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. National Institute of Technology"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  errors.college ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.college && <p className="text-[11px] text-rose-400 mt-1">{errors.college}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Department / Branch *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                placeholder="e.g. Electronics & Communication Engineering"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                  errors.branch ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.branch && <p className="text-[11px] text-rose-400 mt-1">{errors.branch}</p>}
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono">
              Privacy: Stored locally in your browser.
            </span>
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition"
            >
              <span>SAVE & START EXPERIMENT</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
