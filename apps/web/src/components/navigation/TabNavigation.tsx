import React, { useState } from 'react';
import { BarChart3, FileText, Calendar, Package } from 'lucide-react';

export type TabType = 'dashboard' | 'content' | 'planung' | 'pakete';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'dashboard' as TabType, name: 'Dashboard', icon: BarChart3 },
  { id: 'content' as TabType, name: 'Content', icon: FileText },
  { id: 'planung' as TabType, name: 'Planung', icon: Calendar },
  { id: 'pakete' as TabType, name: 'Pakete', icon: Package },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {/* Dynamic Island Container */}
        <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ease-out
                  flex items-center gap-2 min-w-[120px] justify-center
                  ${isActive 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-gray-900'
                  }
                  ${isHovered && !isActive ? 'bg-white/40 transform scale-[1.02]' : ''}
                `}
              >
                {/* Active Tab Background */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg" />
                )}
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <IconComponent size={16} />
                  <span>{tab.name}</span>
                </div>
                
                {/* Hover Effect */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Liquid Glass Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-3xl blur-xl opacity-30" />
      </div>
    </div>
  );
}
