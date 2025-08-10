import React, { useState } from 'react';
import { X, Upload, Calendar, Tag, FileText, Instagram, Youtube, Video, Image } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: ProjectData) => void;
}

interface ProjectData {
  name: string;
  type: 'instagram-reel' | 'youtube-video';
  description: string;
  deadline: string;
  tags: string[];
}

const projectTypes = [
  { 
    id: 'instagram-reel' as const, 
    name: 'Instagram Reel', 
    icon: Instagram, 
    color: 'from-pink-500 to-rose-600',
    description: 'Vertikales Video für Instagram Reels'
  },
  { 
    id: 'youtube-video' as const, 
    name: 'YouTube Video', 
    icon: Youtube, 
    color: 'from-red-500 to-red-600',
    description: 'Horizontales Video für YouTube'
  }
];

export default function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [formData, setFormData] = useState<ProjectData>({
    name: '',
    type: 'instagram-reel',
    description: '',
    deadline: '',
    tags: []
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      type: 'instagram-reel',
      description: '',
      deadline: '',
      tags: []
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const selectedProjectType = projectTypes.find(type => type.id === formData.type);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-gradient">Neues Projekt</h2>
            <p className="text-sm muted mt-1">Erstelle ein neues Content-Projekt</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/60 hover:bg-white/80 flex items-center justify-center transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Projekt Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Projekt Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
              placeholder="z.B. Food Styling Reel #1"
              required
            />
          </div>

          {/* Projekt Typ */}
          <div>
            <label className="block text-sm font-semibold mb-3">Projekt Typ</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = formData.type === type.id;
                
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-amber-500 bg-amber-500/10' 
                        : 'border-white/20 bg-white/40 hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-white`}>
                        <IconComponent size={16} />
                      </div>
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <p className="text-xs muted">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-semibold mb-2">Beschreibung</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 resize-none"
              rows={3}
              placeholder="Beschreibe dein Projekt..."
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-semibold mb-2">Deadline</label>
            <div className="relative">
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 rounded-xl bg-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
                placeholder="Tag hinzufügen..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-200"
              >
                <Tag size={16} />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-500/20 text-amber-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-amber-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>


          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-white/60 hover:bg-white/80 font-medium transition-all duration-200"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-200"
            >
              Projekt erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
