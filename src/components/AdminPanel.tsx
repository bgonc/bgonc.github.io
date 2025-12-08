import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Experience, Project, Skill } from '../types';

const AdminPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { data, updateData, resetData, language } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'experience' | 'projects' | 'skills'>('general');
  const [showExport, setShowExport] = useState(false);

  // Temporary local state for editing before saving
  const [formData, setFormData] = useState(data);

  // Sync form data if data updates externally
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check. NOT SECURE for real production, but fine for static portfolio
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    updateData(formData);
    alert(`Changes saved for language: ${language.toUpperCase()}!`);
  };

  const handleExport = () => {
    setShowExport(true);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderLogin = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-secondary p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-text-main mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-primary border border-slate-600 rounded-lg px-4 py-2 text-text-main focus:border-accent focus:outline-none"
              placeholder="Enter password..."
            />
          </div>
          <div className="flex gap-3">
             <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">Default password is: admin123</p>
      </div>
    </div>
  );

  const renderExportModal = () => (
     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
        <div className="bg-secondary p-6 rounded-xl border border-slate-700 w-3/4 max-w-2xl h-3/4 flex flex-col">
            <h3 className="text-xl font-bold text-text-main mb-2">Export Configuration ({language.toUpperCase()})</h3>
            <p className="text-slate-400 text-sm mb-4">
                To make these changes permanent, update <code className="text-accent">constants.ts</code>. 
                Replace <code className="text-accent">PORTFOLIO_DATA_{language.toUpperCase()}</code> with this:
            </p>
            <textarea 
                readOnly 
                className="flex-1 bg-primary p-4 font-mono text-xs text-slate-300 rounded-lg border border-slate-600 focus:outline-none resize-none"
                value={`export const PORTFOLIO_DATA_${language.toUpperCase()}: PortfolioData = ${JSON.stringify(formData, null, 2)};`}
            />
            <div className="mt-4 flex justify-end">
                <button 
                    onClick={() => setShowExport(false)}
                    className="px-6 py-2 bg-accent text-white font-bold rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
     </div>
  );

  if (!isAuthenticated) return renderLogin();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {showExport && renderExportModal()}
      <div className="bg-secondary w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-sliders"></i> Content Manager ({language.toUpperCase()})
          </h2>
          <div className="flex gap-2">
             <button onClick={() => { resetData(); onClose(); }} className="text-xs text-red-400 hover:text-red-300 px-3 py-1">
                Reset Default
             </button>
             <button onClick={onClose} className="text-slate-400 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-800/50">
          {(['general', 'experience', 'projects', 'skills'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'text-accent border-b-2 border-accent bg-slate-800' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-primary/50">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
                <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="space-y-2">
                        <label className="text-sm text-text-muted">Full Name</label>
                        <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} className="w-full bg-secondary border border-slate-600 rounded p-2 text-text-main" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-text-muted">Job Title</label>
                        <input type="text" value={formData.title} onChange={e => updateField('title', e.target.value)} className="w-full bg-secondary border border-slate-600 rounded p-2 text-text-main" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-text-muted">Bio</label>
                        <textarea rows={4} value={formData.bio} onChange={e => updateField('bio', e.target.value)} className="w-full bg-secondary border border-slate-600 rounded p-2 text-text-main" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-text-muted">Email</label>
                        <input type="text" value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full bg-secondary border border-slate-600 rounded p-2 text-text-main" />
                    </div>
                </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
                 <div className="space-y-4">
                    {formData.skills.map((skill, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-secondary p-3 rounded-lg border border-slate-600">
                            <input 
                                type="text" 
                                value={skill.name} 
                                onChange={e => {
                                    const newSkills = [...formData.skills];
                                    newSkills[idx].name = e.target.value;
                                    updateField('skills', newSkills);
                                }}
                                className="flex-1 bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                            />
                            <input 
                                type="number" 
                                value={skill.level} 
                                onChange={e => {
                                    const newSkills = [...formData.skills];
                                    newSkills[idx].level = parseInt(e.target.value);
                                    updateField('skills', newSkills);
                                }}
                                className="w-20 bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                            />
                             <button 
                                onClick={() => {
                                    const newSkills = formData.skills.filter((_, i) => i !== idx);
                                    updateField('skills', newSkills);
                                }}
                                className="text-red-400 hover:text-red-300"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={() => updateField('skills', [...formData.skills, { name: 'New Skill', level: 50, category: 'Tools' }])}
                        className="w-full py-2 border border-dashed border-slate-600 text-slate-400 rounded hover:bg-slate-800 hover:text-accent"
                    >
                        + Add Skill
                    </button>
                 </div>
            )}

             {/* PROJECTS TAB */}
             {activeTab === 'projects' && (
                 <div className="space-y-6">
                    {formData.projects.map((project, idx) => (
                        <div key={project.id} className="bg-secondary p-4 rounded-lg border border-slate-600 space-y-3 relative">
                            <button 
                                onClick={() => {
                                    const newProjects = formData.projects.filter((_, i) => i !== idx);
                                    updateField('projects', newProjects);
                                }}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Title</label>
                                    <input 
                                        value={project.title}
                                        onChange={e => {
                                            const newP = [...formData.projects];
                                            newP[idx].title = e.target.value;
                                            updateField('projects', newP);
                                        }}
                                        className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Image URL</label>
                                    <input 
                                        value={project.imageUrl}
                                        onChange={e => {
                                            const newP = [...formData.projects];
                                            newP[idx].imageUrl = e.target.value;
                                            updateField('projects', newP);
                                        }}
                                        className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Description</label>
                                <textarea 
                                    value={project.description}
                                    rows={2}
                                    onChange={e => {
                                        const newP = [...formData.projects];
                                        newP[idx].description = e.target.value;
                                        updateField('projects', newP);
                                    }}
                                    className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                />
                            </div>
                        </div>
                    ))}
                     <button 
                        onClick={() => updateField('projects', [...formData.projects, { 
                            id: Date.now(), 
                            title: 'New Project', 
                            description: 'Project description...',
                            technologies: ['React'],
                            imageUrl: 'https://picsum.photos/600/400',
                            githubUrl: '#' 
                        }])}
                        className="w-full py-2 border border-dashed border-slate-600 text-slate-400 rounded hover:bg-slate-800 hover:text-accent"
                    >
                        + Add Project
                    </button>
                 </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
                 <div className="space-y-6">
                    {formData.experience.map((job, idx) => (
                        <div key={job.id} className="bg-secondary p-4 rounded-lg border border-slate-600 space-y-3 relative">
                            <button 
                                onClick={() => {
                                    const newExp = formData.experience.filter((_, i) => i !== idx);
                                    updateField('experience', newExp);
                                }}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Role</label>
                                    <input 
                                        value={job.role}
                                        onChange={e => {
                                            const newE = [...formData.experience];
                                            newE[idx].role = e.target.value;
                                            updateField('experience', newE);
                                        }}
                                        className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Company</label>
                                    <input 
                                        value={job.company}
                                        onChange={e => {
                                            const newE = [...formData.experience];
                                            newE[idx].company = e.target.value;
                                            updateField('experience', newE);
                                        }}
                                        className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                    />
                                </div>
                            </div>
                             <div className="space-y-1">
                                    <label className="text-xs text-slate-500">Period</label>
                                    <input 
                                        value={job.period}
                                        onChange={e => {
                                            const newE = [...formData.experience];
                                            newE[idx].period = e.target.value;
                                            updateField('experience', newE);
                                        }}
                                        className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                    />
                                </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Description</label>
                                <textarea 
                                    value={job.description}
                                    rows={2}
                                    onChange={e => {
                                        const newE = [...formData.experience];
                                        newE[idx].description = e.target.value;
                                        updateField('experience', newE);
                                    }}
                                    className="w-full bg-primary border border-slate-500 rounded px-2 py-1 text-text-main"
                                />
                            </div>
                        </div>
                    ))}
                     <button 
                        onClick={() => updateField('experience', [...formData.experience, { 
                            id: Date.now(), 
                            role: 'New Role',
                            company: 'Company Name',
                            period: '2023 - Present',
                            description: 'Job description...'
                        }])}
                        className="w-full py-2 border border-dashed border-slate-600 text-slate-400 rounded hover:bg-slate-800 hover:text-accent"
                    >
                        + Add Experience
                    </button>
                 </div>
            )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-700 bg-secondary flex justify-between items-center">
          <div className="text-xs text-slate-500">
             Changes are saved locally. Export to file to persist.
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-4 py-2 text-slate-300 hover:text-white font-medium flex items-center gap-2"
            >
               <i className="fa-solid fa-code"></i> Get Code
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-lg shadow-accent/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;