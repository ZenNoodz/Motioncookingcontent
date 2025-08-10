// Dynamic API URL based on environment
const API_BASE_URL = (import.meta as any).env?.MODE === 'production'
  ? 'https://your-railway-app.railway.app' // Will be replaced with actual Railway URL
  : 'http://localhost:4000';

export interface ContentItem {
  id: string;
  name: string;
  platform: 'instagram' | 'youtube';
  status: string;
  dropboxLink: string;
  frameioLink: string;
  caption: string;
  dawidDeadline: string;
  postingDate: string;
  size: string;
  author: string;
  date: string;
}

export interface BoardColumn {
  id: string;
  name: string;
  count: number;
  color: string;
  cards: BoardCard[];
}

export interface BoardCard {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Content API
  async getContentItems(): Promise<{ data: ContentItem[] }> {
    return this.request<{ data: ContentItem[] }>('/api/content');
  }

  async updateContentStatus(id: string, status: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/content/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async updateContentCaption(id: string, caption: string, platform = 'instagram'): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/content/${id}/caption`, {
      method: 'PUT',
      body: JSON.stringify({ caption, platform }),
    });
  }

  async updateFrameioLink(id: string, url: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/api/content/${id}/frameio`, {
      method: 'PUT',
      body: JSON.stringify({ url }),
    });
  }

  async createContentItem(data: {
    title: string;
    platform: string;
    brief?: string;
    plannedDate?: string;
  }): Promise<{ success: boolean; data: any }> {
    return this.request<{ success: boolean; data: any }>('/api/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Board API
  async getBoardData(): Promise<{ data: BoardColumn[] }> {
    return this.request<{ data: BoardColumn[] }>('/api/board');
  }

  async moveBoardCard(cardId: string, fromColumnId: string, toColumnId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('/api/board/move', {
      method: 'PUT',
      body: JSON.stringify({ cardId, fromColumnId, toColumnId }),
    });
  }

  async createBoardCard(data: {
    title: string;
    description?: string;
    columnId: string;
    dueDate?: string;
  }): Promise<{ success: boolean; data: any }> {
    return this.request<{ success: boolean; data: any }>('/api/board/card', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; zeit: string }> {
    return this.request<{ status: string; zeit: string }>('/api/health');
  }
}

export const apiService = new ApiService();
