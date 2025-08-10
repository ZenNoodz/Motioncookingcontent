# 🚂 RAILWAY DEPLOYMENT GUIDE - SUPABASE

## 🎯 SCHRITT-FÜR-SCHRITT ANLEITUNG

### **VORBEREITUNG ABGESCHLOSSEN ✅**
- ✅ Supabase PostgreSQL konfiguriert und getestet
- ✅ Alle 12 Tabellen erfolgreich erstellt
- ✅ Railway.json konfiguriert
- ✅ Environment Variables vorbereitet

## 🚀 **RAILWAY DEPLOYMENT**

### **SCHRITT 1: Railway Account & Projekt** ⏱️ 3 Min

1. **Gehen Sie zu [railway.app](https://railway.app)**
2. **Klicken Sie auf "Start a New Project"**
3. **Wählen Sie "Deploy from GitHub repo"**
4. **Verbinden Sie Ihr GitHub-Repository**

### **SCHRITT 2: Repository konfigurieren** ⏱️ 2 Min

1. **Repository auswählen**: Ihr MotionContent Repository
2. **Root Directory setzen**: `apps/server`
3. **Branch auswählen**: `main` (oder Ihr Haupt-Branch)

### **SCHRITT 3: Environment Variables setzen** ⏱️ 3 Min

**Kopieren Sie diese Variablen exakt in Railway:**

```env
DATABASE_URL=postgresql://postgres:ZenNoodz69@db.rxrfkdumkwduatsvmabk.supabase.co:5432/postgres
NODE_ENV=production
PORT=4000
ALLOWED_ORIGINS=https://motioncontent.at,https://www.motioncontent.at
JWT_SECRET=motioncontent_2025_secure_jwt_secret_supabase_production_key
API_VERSION=v1
```

**So fügen Sie die Variablen hinzu:**
1. Klicken Sie auf Ihr Projekt in Railway
2. Gehen Sie zum **"Variables"** Tab
3. Klicken Sie **"New Variable"**
4. Fügen Sie jede Variable einzeln hinzu:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:ZenNoodz69@db.rxrfkdumkwduatsvmabk.supabase.co:5432/postgres`
   - Wiederholen für alle anderen Variablen

### **SCHRITT 4: Deployment starten** ⏱️ 5 Min

1. **Klicken Sie "Deploy"**
2. **Warten Sie auf den Build-Prozess** (3-5 Minuten)
3. **Überwachen Sie die Logs** im Railway Dashboard

**Erwartete Build-Schritte:**
```
📦 Installing dependencies...
🔨 Building TypeScript...
🗄️ Running Prisma migrations...
🚀 Starting server...
✅ Deployment successful!
```

### **SCHRITT 5: Deployment URL notieren** ⏱️ 1 Min

Nach erfolgreichem Deployment:
1. **Kopieren Sie die Railway-URL** (z.B. `https://motioncontent-production-abc123.up.railway.app`)
2. **Notieren Sie sich diese URL** - Sie brauchen sie für das Frontend

## 🔍 **DEPLOYMENT TESTEN**

### **Health Check**
```bash
curl https://ihre-railway-url.railway.app/api/health
```

**Erwartete Antwort:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-08T12:00:00.000Z",
  "database": "connected",
  "version": "v1"
}
```

### **Database Check**
```bash
curl https://ihre-railway-url.railway.app/api/content
```

**Erwartete Antwort:**
```json
{
  "content": [],
  "total": 0
}
```

## 🎨 **FRONTEND AKTUALISIEREN**

### **API-URL konfigurieren**

1. **Öffnen Sie**: `apps/web/src/services/api.ts`
2. **Ersetzen Sie die URL**:

```typescript
// VORHER:
const API_BASE_URL = (import.meta as any).env?.MODE === 'production'
  ? 'https://your-actual-railway-url.railway.app'  // <-- Platzhalter
  : 'http://localhost:4000';

// NACHHER (mit Ihrer echten Railway-URL):
const API_BASE_URL = (import.meta as any).env?.MODE === 'production'
  ? 'https://motioncontent-production-abc123.up.railway.app'  // <-- Ihre echte URL
  : 'http://localhost:4000';
```

### **Frontend builden und deployen**

```bash
# Frontend builden
cd apps/web
npm run build

# Dist-Ordner zu World4You hochladen
# Via FTP oder File Manager
```

## 📊 **RAILWAY DASHBOARD FEATURES**

### **Monitoring**
- ✅ **CPU & Memory Usage**
- ✅ **Request Logs**
- ✅ **Error Tracking**
- ✅ **Deployment History**

### **Logs ansehen**
1. Railway Dashboard → Ihr Projekt
2. **"Deployments"** Tab
3. **Klicken Sie auf die neueste Deployment**
4. **"View Logs"** für detaillierte Ausgabe

### **Metriken**
- **Response Times**
- **Request Volume**
- **Error Rates**
- **Database Connections**

## 🔧 **TROUBLESHOOTING**

### **Build Fehler**
```
❌ Error: Cannot find module '@prisma/client'
```
**Lösung**: Prisma Generate läuft automatisch - warten Sie den kompletten Build ab

### **Database Connection Fehler**
```
❌ Can't reach database server
```
**Lösung**: 
1. Environment Variables überprüfen
2. Supabase-Projekt ist aktiv
3. Connection String ist korrekt

### **Port Fehler**
```
❌ Error: listen EADDRINUSE :::4000
```
**Lösung**: Railway setzt automatisch den PORT - Environment Variable `PORT=4000` ist korrekt

### **CORS Fehler**
```
❌ Access to fetch blocked by CORS policy
```
**Lösung**: `ALLOWED_ORIGINS` Environment Variable überprüfen

## 🎉 **DEPLOYMENT ERFOLGREICH!**

Nach erfolgreichem Deployment haben Sie:

- 🌐 **Live API**: `https://ihre-railway-url.railway.app`
- 🗄️ **Supabase Database**: Vollständig verbunden
- 📊 **Monitoring**: Railway Dashboard
- 🔄 **Auto-Deploy**: Bei Git-Push
- 🛡️ **SSL**: Automatisch aktiviert
- 📈 **Skalierung**: Automatisch bei Bedarf

## 📋 **NÄCHSTE SCHRITTE**

1. ✅ **Railway-URL notieren**
2. ✅ **Frontend API-URL aktualisieren**
3. ✅ **Frontend builden und zu World4You hochladen**
4. ✅ **End-to-End Test durchführen**

---

**🚀 Ihr MotionContent Backend läuft jetzt professionell auf Railway mit Supabase!**

**Railway-URL**: `https://ihre-railway-url.railway.app`
**Supabase Dashboard**: `https://supabase.com/dashboard/project/rxrfkdumkwduatsvmabk`
