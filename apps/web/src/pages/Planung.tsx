import React, { useState } from "react";
import { Plus, MoreHorizontal, Calendar, Users } from "lucide-react";
import { mockPlanningColumns } from "../utils/mockData";
import { PlanningColumn } from "../types";

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

interface KanbanColumnData extends PlanningColumn {
  id: string;
  cards: KanbanCard[];
}

export default function Planung() {
  // Erweiterte Kanban-Daten mit echten Karten
  const [columns, setColumns] = useState<KanbanColumnData[]>([
    {
      id: 'neues-video-aida',
      name: "Neues Video Aida",
      count: 8,
      color: "from-purple-400 to-purple-600",
      cards: [
        {
          id: '1',
          title: 'Food Styling Reel #1',
          description: 'Leckeres Food Styling für Instagram',
          assignee: 'Dawid',
          dueDate: '2025-01-15',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Recipe Tutorial',
          description: 'Schritt-für-Schritt Anleitung',
          assignee: 'Dawid',
          dueDate: '2025-01-18',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Quick Recipe Reel',
          description: 'Schnelles Rezept in 60 Sekunden',
          assignee: 'Dawid',
          dueDate: '2025-01-14',
          priority: 'high'
        }
      ]
    },
    {
      id: 'in-arbeit',
      name: "In Arbeit",
      count: 3,
      color: "from-blue-400 to-blue-600",
      cards: [
        {
          id: '4',
          title: 'Behind Scenes',
          description: 'Blick hinter die Kulissen',
          assignee: 'Dawid',
          dueDate: '2025-01-12',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Ingredient Showcase',
          description: 'Die besten Zutaten präsentieren',
          assignee: 'Dawid',
          dueDate: '2025-01-16',
          priority: 'low'
        }
      ]
    },
    {
      id: 'review',
      name: "Review",
      count: 2,
      color: "from-orange-400 to-orange-600",
      cards: [
        {
          id: '6',
          title: 'Kitchen Tour',
          description: 'Tour durch die professionelle Küche',
          assignee: 'Dawid',
          dueDate: '2025-01-20',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'fertig',
      name: "Fertig",
      count: 12,
      color: "from-green-400 to-green-600",
      cards: [
        {
          id: '7',
          title: 'Cooking Tips Short',
          description: '5 Profi-Tipps für besseres Kochen',
          assignee: 'Dawid',
          dueDate: '2025-01-10',
          priority: 'low'
        },
        {
          id: '8',
          title: 'Seasonal Menu',
          description: 'Wintermenü mit saisonalen Zutaten',
          assignee: 'Dawid',
          dueDate: '2025-01-22',
          priority: 'low'
        }
      ]
    }
  ]);

  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDragStart = (card: KanbanCard, columnId: string) => {
    setDraggedCard(card);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedCard || !draggedFromColumn) return;

    // Karte von alter Spalte entfernen und zu neuer hinzufügen
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === draggedFromColumn) {
          return {
            ...column,
            cards: column.cards.filter(card => card.id !== draggedCard.id),
            count: column.count - 1
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            cards: [...column.cards, draggedCard],
            count: column.count + 1
          };
        }
        return column;
      });
    });

    setDraggedCard(null);
    setDraggedFromColumn(null);
  };

  const KanbanCard = ({ card, columnId }: { card: KanbanCard; columnId: string }) => (
    <div
      draggable
      onDragStart={() => handleDragStart(card, columnId)}
      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move border border-white/20 hover:bg-white/80"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm">{card.title}</h4>
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(card.priority)}`}></div>
      </div>
      
      {card.description && (
        <p className="text-xs text-gray-600 mb-3">{card.description}</p>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Users size={12} />
          <span>{card.assignee}</span>
        </div>
        {card.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(card.dueDate).toLocaleDateString('de-DE')}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Planung</h1>
          <p className="muted">Kanban Board für Content-Planung</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          <span>Neue Karte</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            className="card p-4 min-h-[600px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${column.color}`}></div>
                <h3 className="font-semibold text-sm">{column.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/60 px-2 py-1 rounded-full font-medium">
                  {column.count}
                </span>
                <button className="w-6 h-6 rounded-full bg-white/60 hover:bg-white/80 flex items-center justify-center transition-colors">
                  <MoreHorizontal size={12} />
                </button>
              </div>
            </div>

            {/* Add Card Button */}
            <button className="w-full p-3 rounded-xl border-2 border-dashed border-white/40 hover:border-white/60 hover:bg-white/20 transition-all duration-200 mb-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Plus size={16} />
              <span>Karte hinzufügen</span>
            </button>

            {/* Cards */}
            <div className="space-y-3">
              {column.cards.map((card) => (
                <KanbanCard key={card.id} card={card} columnId={column.id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Board Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Board Statistiken</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm muted">Gesamt Karten</span>
              <span className="font-semibold">{columns.reduce((sum, col) => sum + col.count, 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm muted">In Bearbeitung</span>
              <span className="font-semibold">{columns.find(col => col.id === 'in-arbeit')?.count || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm muted">Abgeschlossen</span>
              <span className="font-semibold">{columns.find(col => col.id === 'fertig')?.count || 0}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Prioritäten</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm">Hoch</span>
              </div>
              <span className="font-semibold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Mittel</span>
              </div>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Niedrig</span>
              </div>
              <span className="font-semibold">3</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Nächste Deadlines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Quick Recipe Reel</span>
              <span className="text-xs bg-red-500/20 text-red-700 px-2 py-1 rounded-full">14.01</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Food Styling Reel</span>
              <span className="text-xs bg-orange-500/20 text-orange-700 px-2 py-1 rounded-full">15.01</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Recipe Tutorial</span>
              <span className="text-xs bg-yellow-500/20 text-yellow-700 px-2 py-1 rounded-full">18.01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
