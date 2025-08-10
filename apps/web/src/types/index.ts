// Projekt-Datentypen
export interface ProjectData {
  name: string;
  type: 'instagram-reel' | 'youtube-video';
  description: string;
  deadline: string;
  tags: string[];
}

// Asset-Datentypen
export interface Asset {
  id: string | number; // Support both string (from backend) and number (legacy)
  name: string;
  platform: 'instagram' | 'youtube';
  dropboxLink: string;
  dawidDeadline: string;
  frameioLink: string;
  caption: string;
  postingDate: string;
  status: 'neues-video-aida' | 'in-arbeit' | 'review' | 'fertig';
  author?: string;
  date?: string;
  size?: string;
}

// Paket-Datentypen
export interface PackageAsset {
  id: number;
  name: string;
  produced: boolean;
  edited: boolean;
}

export interface Package {
  id: number;
  name: string;
  createdDate: string;
  assets: PackageAsset[];
}

// Task-Datentypen
export interface Task {
  name: string;
  deadline: string;
  platform: 'instagram' | 'youtube';
}

// Planungs-Spalten
export interface PlanningColumn {
  name: string;
  count: number;
  color: string;
}

// Tab-Typen
export type TabType = 'dashboard' | 'content' | 'planung' | 'pakete';
export type ContentViewType = 'list' | 'calendar' | 'filter';

// Filter-Typen
export interface Filters {
  platform: string;
  status: string;
}

// Projekt-Typen für Sidebar
export interface SidebarProject {
  name: string;
  color: string;
  active: boolean;
}
