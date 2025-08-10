import { Asset, Task, PlanningColumn, Package } from '../types';

// Mock-Daten für Assets
export const mockAssets: Asset[] = [
  { 
    id: 1, 
    name: "Food Styling Reel #1", 
    platform: "instagram", 
    dropboxLink: "https://dropbox.com/s/abc123", 
    dawidDeadline: "2025-01-15", 
    frameioLink: "https://frame.io/project/xyz789", 
    caption: "Leckeres Food Styling für Instagram! 🍽️ #foodstyling #recipe", 
    postingDate: "2025-01-20", 
    status: "neues-video-aida",
    author: "Dawid",
    date: "Heute",
    size: "24.5 MB"
  },
  { 
    id: 2, 
    name: "Recipe Tutorial", 
    platform: "youtube", 
    dropboxLink: "https://dropbox.com/s/def456", 
    dawidDeadline: "2025-01-18", 
    frameioLink: "https://frame.io/project/abc123", 
    caption: "Schritt-für-Schritt Anleitung für das perfekte Gericht", 
    postingDate: "2025-01-25", 
    status: "in-arbeit",
    author: "Dawid",
    date: "Gestern",
    size: "156 MB"
  },
  { 
    id: 3, 
    name: "Behind Scenes", 
    platform: "instagram", 
    dropboxLink: "https://dropbox.com/s/ghi789", 
    dawidDeadline: "2025-01-12", 
    frameioLink: "https://frame.io/project/def456", 
    caption: "Ein Blick hinter die Kulissen unserer Produktion 🎬", 
    postingDate: "2025-01-22", 
    status: "review",
    author: "Dawid",
    date: "2 Tage",
    size: "3.2 MB"
  },
  { 
    id: 4, 
    name: "Cooking Tips Short", 
    platform: "youtube", 
    dropboxLink: "https://dropbox.com/s/jkl012", 
    dawidDeadline: "2025-01-10", 
    frameioLink: "https://frame.io/project/ghi789", 
    caption: "5 Profi-Tipps für besseres Kochen", 
    postingDate: "2025-01-28", 
    status: "fertig",
    author: "Dawid",
    date: "3 Tage",
    size: "89 MB"
  },
  { 
    id: 5, 
    name: "Quick Recipe Reel", 
    platform: "instagram", 
    dropboxLink: "https://dropbox.com/s/mno345", 
    dawidDeadline: "2025-01-14", 
    frameioLink: "https://frame.io/project/jkl012", 
    caption: "Schnelles Rezept in unter 60 Sekunden! ⏰ #quickrecipe", 
    postingDate: "2025-01-30", 
    status: "neues-video-aida",
    author: "Dawid",
    date: "1 Woche",
    size: "12.1 MB"
  },
  { 
    id: 6, 
    name: "Ingredient Showcase", 
    platform: "instagram", 
    dropboxLink: "https://dropbox.com/s/pqr678", 
    dawidDeadline: "2025-01-16", 
    frameioLink: "https://frame.io/project/mno345", 
    caption: "Die besten Zutaten für authentische Gerichte 🌿", 
    postingDate: "2025-02-02", 
    status: "in-arbeit",
    author: "Dawid",
    date: "1 Woche",
    size: "45.2 MB"
  },
  { 
    id: 7, 
    name: "Kitchen Tour", 
    platform: "youtube", 
    dropboxLink: "https://dropbox.com/s/stu901", 
    dawidDeadline: "2025-01-20", 
    frameioLink: "https://frame.io/project/pqr678", 
    caption: "Tour durch meine professionelle Küche", 
    postingDate: "2025-02-05", 
    status: "review",
    author: "Dawid",
    date: "1 Woche",
    size: "234 MB"
  },
  { 
    id: 8, 
    name: "Seasonal Menu", 
    platform: "instagram", 
    dropboxLink: "https://dropbox.com/s/vwx234", 
    dawidDeadline: "2025-01-22", 
    frameioLink: "https://frame.io/project/stu901", 
    caption: "Wintermenü mit saisonalen Zutaten ❄️ #seasonal", 
    postingDate: "2025-02-08", 
    status: "fertig",
    author: "Dawid",
    date: "1 Woche",
    size: "67.8 MB"
  }
];

// Mock-Daten für Tasks
export const mockTasks: Task[] = [
  { name: "Food Styling Video", deadline: "15.01.2025", platform: "instagram" },
  { name: "Recipe Tutorial", deadline: "18.01.2025", platform: "youtube" },
  { name: "Behind Scenes Reel", deadline: "20.01.2025", platform: "instagram" },
  { name: "Cooking Tips Short", deadline: "22.01.2025", platform: "youtube" },
  { name: "Quick Recipe Reel", deadline: "25.01.2025", platform: "instagram" }
];

// Mock-Daten für Planungs-Spalten
export const mockPlanningColumns: PlanningColumn[] = [
  { name: "Neues Video Aida", count: 8, color: "from-purple-400 to-purple-600" },
  { name: "In Arbeit", count: 3, color: "from-blue-400 to-blue-600" },
  { name: "Review", count: 2, color: "from-orange-400 to-orange-600" },
  { name: "Fertig", count: 12, color: "from-green-400 to-green-600" }
];

// Mock-Daten für Pakete
export const mockPackages: Package[] = [
  {
    id: 1,
    name: "PAKET 1",
    createdDate: "2025-01-08",
    assets: [
      { id: 1, name: "Food Styling Reel #1", produced: true, edited: false },
      { id: 2, name: "Behind Scenes", produced: true, edited: true },
      { id: 3, name: "Quick Recipe Reel", produced: true, edited: false },
      { id: 4, name: "Ingredient Showcase", produced: false, edited: false },
      { id: 5, name: "Cooking Tutorial", produced: false, edited: false },
      { id: 6, name: "Food Photography", produced: false, edited: false },
      { id: 7, name: "Recipe Demo", produced: false, edited: false },
      { id: 8, name: "Kitchen Setup", produced: false, edited: false },
      { id: 9, name: "", produced: false, edited: false },
      { id: 10, name: "", produced: false, edited: false }
    ]
  },
  {
    id: 2,
    name: "PAKET 2",
    createdDate: "2025-01-15",
    assets: [
      { id: 11, name: "Seasonal Menu", produced: true, edited: true },
      { id: 12, name: "Holiday Special", produced: true, edited: false },
      { id: 13, name: "", produced: false, edited: false },
      { id: 14, name: "", produced: false, edited: false },
      { id: 15, name: "", produced: false, edited: false },
      { id: 16, name: "", produced: false, edited: false },
      { id: 17, name: "", produced: false, edited: false },
      { id: 18, name: "", produced: false, edited: false },
      { id: 19, name: "", produced: false, edited: false },
      { id: 20, name: "", produced: false, edited: false }
    ]
  },
  {
    id: 3,
    name: "PAKET 3",
    createdDate: "2025-01-22",
    assets: Array(10).fill(null).map((_, i) => ({
      id: 21 + i,
      name: "",
      produced: false,
      edited: false
    }))
  }
];
