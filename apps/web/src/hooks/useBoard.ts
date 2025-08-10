import { useState, useCallback, useEffect } from 'react';
import { apiService, type BoardColumn, type BoardCard } from '../services/api';

export const useBoard = () => {
  const [columns, setColumns] = useState<BoardColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load board data from API
  const loadBoard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBoardData();
      setColumns(response.data);
    } catch (err) {
      setError('Fehler beim Laden des Boards');
      console.error('Error loading board:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load board on mount
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  // Move card between columns
  const moveCard = useCallback(async (cardId: string, fromColumnId: string, toColumnId: string) => {
    try {
      // Optimistically update UI
      setColumns(prevColumns => {
        const newColumns = [...prevColumns];
        
        // Find source and target columns
        const fromColumn = newColumns.find(col => col.id === fromColumnId);
        const toColumn = newColumns.find(col => col.id === toColumnId);
        
        if (!fromColumn || !toColumn) return prevColumns;
        
        // Find and remove card from source column
        const cardIndex = fromColumn.cards.findIndex(card => card.id === cardId);
        if (cardIndex === -1) return prevColumns;
        
        const [movedCard] = fromColumn.cards.splice(cardIndex, 1);
        
        // Add card to target column
        toColumn.cards.push(movedCard);
        
        // Update counts
        fromColumn.count = fromColumn.cards.length;
        toColumn.count = toColumn.cards.length;
        
        return newColumns;
      });

      // Make API call
      await apiService.moveBoardCard(cardId, fromColumnId, toColumnId);
    } catch (err) {
      setError('Fehler beim Verschieben der Karte');
      console.error('Error moving card:', err);
      // Reload board to revert optimistic update
      loadBoard();
    }
  }, [loadBoard]);

  // Add new card
  const addCard = useCallback(async (columnId: string, cardData: {
    title: string;
    description?: string;
    dueDate?: string;
  }) => {
    try {
      const response = await apiService.createBoardCard({
        ...cardData,
        columnId,
      });

      if (response.success) {
        // Reload board to get the new card with proper ID
        await loadBoard();
      }
    } catch (err) {
      setError('Fehler beim Erstellen der Karte');
      console.error('Error creating card:', err);
    }
  }, [loadBoard]);

  // Get cards by column
  const getCardsByColumn = useCallback((columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    return column?.cards || [];
  }, [columns]);

  // Get total card count
  const getTotalCardCount = useCallback(() => {
    return columns.reduce((total, column) => total + column.count, 0);
  }, [columns]);

  return {
    columns,
    loading,
    error,
    moveCard,
    addCard,
    getCardsByColumn,
    getTotalCardCount,
    refreshBoard: loadBoard,
  };
};
