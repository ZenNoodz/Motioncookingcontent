import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  MoreHorizontal,
  Instagram,
  Youtube
} from "lucide-react";
import { useBoard } from "../hooks/useBoard";
import { apiService, type ContentItem } from "../services/api";

interface DashboardProps {
  onNewProject: () => void;
}

export default function Dashboard({ onNewProject }: DashboardProps) {
  const navigate = useNavigate();
  const { columns, loading: boardLoading } = useBoard();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load content items
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await apiService.getContentItems();
        setContentItems(response.data);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Get recent content items (last 5)
  const recentItems = contentItems.slice(0, 5);
  
  // Calculate stats
  const totalItems = contentItems.length;
  const activeItems = contentItems.filter(item => 
    item.status === 'neues-video-aida' || item.status === 'in-arbeit'
  ).length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Dashboard</h1>
          <p className="muted">Überblick über deine Content-Produktion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Area - Smart Stack */}
        <section className="xl:col-span-2 space-y-6">
          {/* Smart Stack Container */}
          <div className="space-y-6">
            {/* Aufgabenzeilen Card */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Clock size={20} />
                Aufgabenzeilen
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8 muted">Lade Aufgaben...</div>
                ) : contentItems.length === 0 ? (
                  <div className="text-center py-8 muted">Keine Aufgaben vorhanden</div>
                ) : (
                  contentItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-200">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                        {item.platform === 'instagram' ? <Instagram size={16} /> : <Youtube size={16} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm muted">Deadline: {item.dawidDeadline || 'Nicht gesetzt'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Paket Status Card */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} />
                Paket Status
              </h3>
              <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Instagram Reels - Paket 1</span>
                  <span className="text-2xl font-bold text-amber-600">8/10</span>
                </div>
                <div className="w-full bg-white/40 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
                <p className="text-sm muted mt-2">2 Videos bis Paket-Abschluss</p>
              </div>
            </div>

            {/* Neues Projekt Card */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Plus size={20} />
                Neues Projekt
              </h3>
              <button 
                onClick={onNewProject}
                className="w-full p-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Plus size={24} />
                <span className="text-lg">Neues Projekt erstellen</span>
              </button>
            </div>
          </div>

          {/* Recent Assets */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Zuletzt hinzugefügt</h3>
              <button 
                onClick={() => navigate('/content')}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                <span>Alle anzeigen</span>
                <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 muted">Lade Content...</div>
              ) : recentItems.length === 0 ? (
                <div className="text-center py-8 muted">Keine Content Items vorhanden</div>
              ) : (
                recentItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-200 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                      {item.platform === 'instagram' ? <Instagram size={20} /> : <Youtube size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm muted">{item.size} • {item.author} • {item.date}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white/80 flex items-center justify-center">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Übersicht</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="muted">Assets gesamt</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="muted">Aktive Assets</span>
                <span className="font-semibold">{activeItems}</span>
              </div>
            </div>
          </div>

          {/* Planning Board */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Planung</h3>
              <button className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Plus size={12} />
              </button>
            </div>
            <p className="muted mb-6 text-sm">Kanban Board für Content-Planung</p>

            <div className="space-y-3">
              {boardLoading ? (
                <div className="text-center py-4 muted text-sm">Lade Board...</div>
              ) : columns.length === 0 ? (
                <div className="text-center py-4 muted text-sm">Keine Spalten vorhanden</div>
              ) : (
                columns.map((column, index) => (
                  <div key={index} className="project-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${column.color}`}></div>
                        <span className="font-medium text-sm">{column.name}</span>
                      </div>
                      <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium">
                        {column.count}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => navigate('/planung')}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-200"
            >
              Board öffnen
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
