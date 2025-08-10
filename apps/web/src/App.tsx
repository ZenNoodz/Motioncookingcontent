import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import NewProjectModal from "./components/modals/NewProjectModal";
import { apiService } from "./services/api";

// Pages
import Dashboard from "./pages/Dashboard";
import Content from "./pages/Content";
import Planung from "./pages/Planung";
import Pakete from "./pages/Pakete";

// Types
import { TabType, ContentViewType, ProjectData } from "./types";

export default function App() {
  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  
  // State Management
  const [contentView, setContentView] = useState<ContentViewType>('list');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  // Get current tab from URL
  const getCurrentTab = (): TabType => {
    const path = location.pathname;
    if (path === '/content') return 'content';
    if (path === '/planung') return 'planung';
    if (path === '/pakete') return 'pakete';
    return 'dashboard';
  };

  // Handlers
  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleCreateProject = async (projectData: ProjectData) => {
    try {
      const response = await apiService.createContentItem({
        title: projectData.name,
        platform: projectData.type === 'instagram-reel' ? 'instagram' : 'youtube',
        brief: projectData.description,
        plannedDate: projectData.deadline
      });
      
      if (response.success) {
        console.log('Neues Projekt erfolgreich erstellt:', response.data);
        setShowNewProjectModal(false);
        // Optional: Navigate to content page to show the new item
        navigate('/content');
      }
    } catch (error) {
      console.error('Fehler beim Erstellen des Projekts:', error);
      // TODO: Show error message to user
    }
  };

  const handleTabChange = (tab: string) => {
    // Navigate to the corresponding route
    switch (tab) {
      case 'dashboard':
        navigate('/');
        break;
      case 'content':
        navigate('/content');
        break;
      case 'planung':
        navigate('/planung');
        break;
      case 'pakete':
        navigate('/pakete');
        break;
    }
  };

  const activeTab = getCurrentTab();

  return (
    <AppLayout
      showTabNavigation={activeTab !== 'dashboard'}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onNewProject={handleNewProject}
      onContentViewChange={setContentView}
      activeContentView={contentView}
    >
      <Routes>
        <Route path="/" element={<Dashboard onNewProject={handleNewProject} />} />
        <Route path="/content" element={<Content contentView={contentView} />} />
        <Route path="/planung" element={<Planung />} />
        <Route path="/pakete" element={<Pakete />} />
      </Routes>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </AppLayout>
  );
}
