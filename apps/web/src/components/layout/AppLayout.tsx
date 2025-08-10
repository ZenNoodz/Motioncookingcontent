import React, { ReactNode } from "react";
import { 
  BarChart3, 
  Film, 
  Calendar, 
  Settings, 
  Plus,
  Sparkles 
} from "lucide-react";

/**
 * AppLayout - Apple & Framer-inspired Design
 * - Glass morphism effects with backdrop blur
 * - 3D hover animations and smooth transitions
 * - Enhanced navigation with gradient effects
 * - Minimalistic and clean aesthetic
 */

function Topbar({ onNewProject }: { onNewProject?: () => void }) {
  return (
    <header className="w-full surface-blur py-6 px-8 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl flex items-center justify-center text-white font-bold text-lg floating">
          CC
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gradient">MotionContent</h1>
          <div className="text-sm muted">Wos geht heit no?</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass cursor-pointer hover:bg-white/20 transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">D</span>
            </div>
            <span className="text-sm font-medium">Dawid Adamus</span>
          </div>
          
          {/* Account Settings Dropdown */}
          <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 min-w-[160px]">
              <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/10 transition-colors duration-200 flex items-center gap-2">
                <Settings size={16} />
                <span className="text-sm font-medium">Einstellungen</span>
              </button>
            </div>
          </div>
        </div>
        <button 
          onClick={onNewProject}
          className="btn-primary flex items-center gap-2"
        >
          <Sparkles size={16} />
          <span>Neues Projekt</span>
        </button>
      </div>
    </header>
  );
}

interface SidebarProps {
  showTabNavigation?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

function Sidebar({ showTabNavigation = false, activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: BarChart3, id: "dashboard" },
    { name: "Content", icon: Film, id: "content" },
    { name: "Planung", icon: Calendar, id: "planung" },
    { name: "Pakete", icon: Settings, id: "pakete" }
  ];

  // Dynamic projects based on active tab
  const getProjectsForTab = (tab: string) => {
    switch (tab) {
      case 'content':
        return [
          { name: "Instagram Reels", color: "from-pink-400 to-rose-500", active: true },
          { name: "YouTube Videos", color: "from-red-400 to-red-600", active: false },
          { name: "TikTok Content", color: "from-purple-400 to-purple-600", active: false }
        ];
      case 'planung':
        return [
          { name: "Januar 2025", color: "from-blue-400 to-blue-600", active: true },
          { name: "Februar 2025", color: "from-indigo-400 to-indigo-600", active: false },
          { name: "März 2025", color: "from-purple-400 to-purple-600", active: false }
        ];
      case 'pakete':
        return [
          { name: "Paket 1 - Reels", color: "from-green-400 to-green-600", active: true },
          { name: "Paket 2 - Tutorials", color: "from-teal-400 to-teal-600", active: false },
          { name: "Paket 3 - Shorts", color: "from-cyan-400 to-cyan-600", active: false }
        ];
      default:
        return [
          { name: "Food-Blog", color: "from-amber-400 to-orange-500", active: true },
          { name: "Reels", color: "from-yellow-400 to-amber-500", active: false },
          { name: "Travel Vlogs", color: "from-orange-400 to-red-500", active: false }
        ];
    }
  };

  const projects = getProjectsForTab(activeTab || 'dashboard');

  if (showTabNavigation) {
    return (
      <aside className="w-full md:w-72 p-6 card sticky top-24 h-fit">
        <nav className="space-y-2">
          <h3 className="text-sm font-semibold muted uppercase tracking-wide mb-4">Navigation</h3>
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={index}
                onClick={() => onTabChange?.(item.id)}
                className={`w-full nav-item flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                  isActive ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105' : 'hover:bg-white/20'
                }`}
              >
                <IconComponent size={18} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold muted uppercase tracking-wide">Projekte</h3>
              <button className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Plus size={12} />
              </button>
            </div>
            
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`project-card cursor-pointer ${
                    project.active ? 'ring-2 ring-amber-500/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${project.color}`}></div>
                    <span className="font-medium text-sm">{project.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-72 p-6 card sticky top-24 h-fit">
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={index}
              onClick={() => onTabChange?.(item.id)}
              className={`w-full nav-item flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                isActive ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' : 'hover:bg-white/20'
              }`}
            >
              <IconComponent size={18} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold muted uppercase tracking-wide">Projekte</h3>
            <button className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <Plus size={12} />
            </button>
          </div>
          
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card cursor-pointer ${
                  project.active ? 'ring-2 ring-amber-500/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${project.color}`}></div>
                  <span className="font-medium text-sm">{project.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface AppLayoutProps {
  children: ReactNode;
  showTabNavigation?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNewProject?: () => void;
  onContentViewChange?: (view: 'list' | 'calendar' | 'filter') => void;
  activeContentView?: 'list' | 'calendar' | 'filter';
}

// Unterkategorien für jeden Tab
const getSubcategoriesForTab = (tab: string) => {
  switch (tab) {
    case 'content':
      return [
        { name: "Listenansicht", count: 247, active: true },
        { name: "Kalenderansicht", count: 0, active: false },
        { name: "Filter", count: 0, active: false }
      ];
    case 'planung':
      return [
        { name: "Alle Projekte", count: 25, active: true },
        { name: "Diese Woche", count: 8, active: false },
        { name: "Nächste Woche", count: 12, active: false },
        { name: "Diesen Monat", count: 25, active: false },
        { name: "Überfällig", count: 3, active: false }
      ];
    case 'pakete':
      return [
        { name: "Zum Aktuellen Paket", count: 0, active: true },
        { name: "Zum vorherigen Paket", count: 0, active: false },
        { name: "Zum nächsten Paket", count: 0, active: false }
      ];
    default:
      return [];
  }
};

export default function AppLayout({ children, showTabNavigation, activeTab, onTabChange, onNewProject, onContentViewChange, activeContentView }: AppLayoutProps) {
  const navItems = [
    { name: "Dashboard", icon: BarChart3, id: "dashboard" },
    { name: "Content", icon: Film, id: "content" },
    { name: "Planung", icon: Calendar, id: "planung" },
    { name: "Pakete", icon: Settings, id: "pakete" }
  ];

  const subcategories = getSubcategoriesForTab(activeTab || 'dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/30 text-gray-900">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-amber-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <Topbar onNewProject={onNewProject} />
          
          {/* Navigation - animiert zwischen Positionen */}
          <div className={`px-8 transition-all duration-500 ease-in-out ${
            showTabNavigation ? 'py-4' : 'py-0 h-0 overflow-hidden'
          }`}>
            {showTabNavigation && (
              <div className="card p-2 mb-4">
                <nav className="flex items-center bg-white/20 rounded-2xl p-1 backdrop-blur-xl">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={index}
                        onClick={() => onTabChange?.(item.id)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 flex-1 ${
                          isActive 
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' 
                            : 'text-gray-700 hover:text-gray-800 hover:bg-white/20'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span className="font-medium text-sm">{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}
          </div>

          <div className="flex gap-8 px-8 pb-8">
            {/* Sidebar - ändert sich basierend auf Tab */}
            <div className="hidden lg:block">
              {showTabNavigation ? (
                // Unterkategorie-Sidebar für andere Tabs
                <aside className="w-72 p-6 card sticky top-24 h-fit">
                  <nav className="space-y-2">
                    <h3 className="text-sm font-semibold muted uppercase tracking-wide mb-4">
                      {activeTab === 'content' ? 'Content-Filter' : 
                       activeTab === 'planung' ? 'Zeiträume' : 
                       activeTab === 'pakete' ? 'Paket-Status' : 'Filter'}
                    </h3>
                    {subcategories.map((item, index) => {
                      const handleClick = () => {
                        if (activeTab === 'content' && onContentViewChange) {
                          if (item.name === 'Listenansicht') onContentViewChange('list');
                          else if (item.name === 'Kalenderansicht') onContentViewChange('calendar');
                          else if (item.name === 'Filter') {
                            // Toggle Filter-Ansicht
                            if (activeContentView === 'filter') {
                              onContentViewChange('list'); // Zurück zur Liste wenn Filter bereits aktiv
                            } else {
                              onContentViewChange('filter');
                            }
                          }
                        }
                      };

                      const isActive = activeTab === 'content' && 
                        ((item.name === 'Listenansicht' && activeContentView === 'list') ||
                         (item.name === 'Kalenderansicht' && activeContentView === 'calendar') ||
                         (item.name === 'Filter' && activeContentView === 'filter'));

                      return (
                        <div key={index}>
                          <button
                            onClick={handleClick}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                              isActive 
                                ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30' 
                                : 'hover:bg-white/40'
                            }`}
                          >
                            <span className="font-medium text-sm">{item.name}</span>
                            <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium">
                              {item.count}
                            </span>
                          </button>
                          
                          {/* Filter Dropdown - nur anzeigen wenn Filter aktiv ist */}
                          {item.name === 'Filter' && activeContentView === 'filter' && (
                            <div className="mt-3 p-4 rounded-xl bg-white/30 border border-white/20 space-y-4">
                              {/* Plattform Filter */}
                              <div>
                                <label className="block text-xs font-semibold mb-2 text-gray-700">Plattform</label>
                                <select 
                                  className="w-full px-3 py-2 rounded-lg bg-white/60 border border-white/20 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                  defaultValue="all"
                                >
                                  <option value="all">Alle Plattformen</option>
                                  <option value="instagram">📷 Instagram</option>
                                  <option value="youtube">🎥 YouTube</option>
                                </select>
                              </div>

                              {/* Status Filter */}
                              <div>
                                <label className="block text-xs font-semibold mb-2 text-gray-700">Status</label>
                                <select 
                                  className="w-full px-3 py-2 rounded-lg bg-white/60 border border-white/20 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                  defaultValue="all"
                                >
                                  <option value="all">Alle Status</option>
                                  <option value="neues-video-aida">🟣 Neues Video Aida</option>
                                  <option value="in-arbeit">🔵 In Arbeit</option>
                                  <option value="review">🟠 Review</option>
                                  <option value="fertig">🟢 Fertig</option>
                                </select>
                              </div>

                              {/* Reset Button */}
                              <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium hover:shadow-lg transition-all duration-200">
                                Filter zurücksetzen
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </aside>
              ) : (
                // Dashboard-Sidebar
                <Sidebar 
                  showTabNavigation={false}
                  activeTab={activeTab}
                  onTabChange={onTabChange}
                />
              )}
            </div>

            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
