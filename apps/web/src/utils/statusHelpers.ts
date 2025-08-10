// Status-Farben und -Texte
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'neues-video-aida': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
    case 'in-arbeit': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    case 'review': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
    case 'fertig': return 'bg-green-500/20 text-green-700 border-green-500/30';
    default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'neues-video-aida': return 'Neues Video Aida';
    case 'in-arbeit': return 'In Arbeit';
    case 'review': return 'Review';
    case 'fertig': return 'Fertig';
    default: return status;
  }
};

// Datum-Formatierung
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

// Kalender-Hilfsfunktionen
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Montag = 0
};

// Assets nach Datum gruppieren
export const groupAssetsByDate = <T extends { postingDate: string }>(assets: T[]): Record<number, T[]> => {
  return assets.reduce((acc, asset) => {
    const date = new Date(asset.postingDate).getDate();
    if (!acc[date]) acc[date] = [];
    acc[date].push(asset);
    return acc;
  }, {} as Record<number, T[]>);
};

// Pagination-Hilfsfunktionen
export const getPaginatedItems = <T>(items: T[], page: number, itemsPerPage: number): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
