# 🎬 MotionContent - Social Media Management Tool

Ein professionelles Tool zur Verwaltung von Social Media Content mit Video- und Bildbearbeitung.

## 🚀 Features

- 📊 **Dashboard** - Übersicht über alle Projekte und Content
- 🎥 **Asset-Verwaltung** - Videos und Bilder organisieren
- 📝 **Content-Planung** - Social Media Posts planen
- 🏷️ **Tag-System** - Content kategorisieren
- 💬 **Kommentarsystem** - Feedback und Zusammenarbeit
- 📋 **Kanban-Board** - Workflow-Management

## 🏗️ Architektur

### Frontend (React + TypeScript)
- **Framework**: React 18 mit TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Deployment**: World4You (Static Hosting)

### Backend (Node.js + TypeScript)
- **Framework**: Express.js mit TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Deployment**: Render.com

### Database (Supabase PostgreSQL)
- **Provider**: Supabase (kostenlos)
- **Version**: PostgreSQL 17.4
- **Features**: Web-Interface, automatische Backups

## 🛠️ Lokale Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Installation

```bash
# Repository klonen
git clone https://github.com/IHR-USERNAME/motioncontent.git
cd motioncontent

# Dependencies installieren
npm install

# Backend starten
cd apps/server
npm run dev

# Frontend starten (neues Terminal)
cd apps/web
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://..."
NODE_ENV="development"
PORT=4000
JWT_SECRET="your-secret"
```

## 🚀 Deployment

### Backend (Render.com)
1. Repository zu GitHub pushen
2. Render.com Account erstellen
3. Web Service erstellen mit Root Directory: `apps/server`
4. Environment Variables setzen
5. Deploy starten

### Frontend (World4You)
1. Build erstellen: `cd apps/web && npm run build`
2. `dist/` Ordner zu World4You hochladen

## 📊 Database Schema

### Haupttabellen
- **User** - Benutzerverwaltung
- **Project** - Projekt-Management
- **Asset** - Video/Bild-Verwaltung
- **ContentItem** - Content-Planung
- **Comment** - Kommentarsystem
- **Tag** - Tag-System

## 🔧 Technologie-Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Deployment
- Frontend: World4You
- Backend: Render.com
- Database: Supabase

## 📝 API Endpoints

### Health Check
```
GET /api/health
```

### Content Management
```
GET /api/content
POST /api/content
PUT /api/content/:id
DELETE /api/content/:id
```

### Board Management
```
GET /api/board/:projectId
POST /api/board/:projectId/columns
PUT /api/board/cards/:cardId
```

## 🎯 Roadmap

- [ ] File Upload für Assets
- [ ] Real-time Collaboration
- [ ] Social Media Integration
- [ ] Analytics Dashboard
- [ ] Mobile App

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📞 Support

Bei Fragen oder Problemen erstellen Sie bitte ein [Issue](https://github.com/IHR-USERNAME/motioncontent/issues).

---

**🎬 MotionContent - Professionelle Social Media Verwaltung**
