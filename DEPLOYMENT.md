# 🚀 DEPLOYMENT GUIDE - MOTIONCONTENT.AT

## 📋 ÜBERSICHT

Diese Anleitung führt Sie durch das Deployment der MotionContent-Anwendung auf:
- **Frontend**: World4You Webhosting (motioncontent.at)
- **Backend**: Railway (Node.js API)
- **Datenbank**: World4You MySQL

## 🎯 PHASE 1: WORLD4YOU MYSQL DATENBANK SETUP

### 1.1 MySQL Datenbank erstellen
1. Loggen Sie sich in Ihr World4You Control Panel ein
2. Navigieren Sie zu "Datenbanken" → "MySQL Datenbanken"
3. Erstellen Sie eine neue Datenbank:
   - **Datenbankname**: `motioncontent_prod`
   - **Benutzername**: Notieren Sie sich den generierten Benutzernamen
   - **Passwort**: Erstellen Sie ein sicheres Passwort
4. Aktivieren Sie "Remote-Zugriff" für externe Verbindungen
5. Notieren Sie sich die Verbindungsdaten:
   - **Host**: (z.B. `mysql.world4you.com`)
   - **Port**: `3306`
   - **Datenbankname**: `motioncontent_prod`
   - **Benutzername**: `[Ihr Benutzername]`
   - **Passwort**: `[Ihr Passwort]`

## 🎯 PHASE 2: RAILWAY BACKEND DEPLOYMENT

### 2.1 Railway Account Setup
1. Gehen Sie zu [railway.app](https://railway.app)
2. Registrieren Sie sich mit GitHub
3. Erstellen Sie ein neues Projekt

### 2.2 Backend deployen
1. Verbinden Sie Ihr GitHub Repository mit Railway
2. Wählen Sie das `apps/server` Verzeichnis als Root
3. Setzen Sie folgende Environment-Variablen in Railway:

```env
DATABASE_URL=mysql://[username]:[password]@[host]:3306/[database]
NODE_ENV=production
PORT=4000
ALLOWED_ORIGINS=https://motioncontent.at,https://www.motioncontent.at
JWT_SECRET=[generieren Sie einen sicheren JWT Secret]
API_VERSION=v1
```

**Beispiel DATABASE_URL:**
```
DATABASE_URL=mysql://mc_user:secure_password@mysql.world4you.com:3306/motioncontent_prod
```

### 2.3 Deployment testen
1. Railway wird automatisch deployen
2. Notieren Sie sich die Railway-URL (z.B. `https://your-app-name.railway.app`)
3. Testen Sie die API: `https://your-app-name.railway.app/api/health`

## 🎯 PHASE 3: FRONTEND VORBEREITUNG

### 3.1 API-URL aktualisieren
1. Öffnen Sie `apps/web/src/services/api.ts`
2. Ersetzen Sie `'https://your-railway-app.railway.app'` mit Ihrer echten Railway-URL

### 3.2 Frontend builden
```bash
cd apps/web
npm run build
```

Dies erstellt einen `dist/` Ordner mit den statischen Dateien.

## 🎯 PHASE 4: WORLD4YOU FRONTEND DEPLOYMENT

### 4.1 FTP-Upload
1. Verbinden Sie sich via FTP zu Ihrem World4You Hosting
   - **Host**: `ftp.world4you.com`
   - **Benutzername**: Ihr World4You FTP-Benutzername
   - **Passwort**: Ihr World4You FTP-Passwort
2. Navigieren Sie zum `public_html/` oder `htdocs/` Verzeichnis
3. Laden Sie alle Dateien aus `apps/web/dist/` hoch

### 4.2 Domain-Konfiguration
1. Stellen Sie sicher, dass `motioncontent.at` auf Ihr Hosting zeigt
2. SSL-Zertifikat sollte automatisch aktiviert sein

## 🎯 PHASE 5: DATENBANK-MIGRATION

### 5.1 Migrationen ausführen
Railway führt automatisch `prisma migrate deploy` aus, aber Sie können es auch manuell testen:

```bash
cd apps/server
DATABASE_URL="mysql://[your-connection-string]" npx prisma migrate deploy
```

### 5.2 Seed-Daten (Optional)
```bash
DATABASE_URL="mysql://[your-connection-string]" npm run prisma:seed
```

## 🎯 PHASE 6: TESTING & VERIFIKATION

### 6.1 End-to-End Test
1. Besuchen Sie `https://motioncontent.at`
2. Testen Sie die Navigation
3. Erstellen Sie ein neues Projekt
4. Überprüfen Sie die Content-Verwaltung

### 6.2 API-Tests
```bash
# Health Check
curl https://your-railway-app.railway.app/api/health

# Content API
curl https://your-railway-app.railway.app/api/content
```

## 🔧 TROUBLESHOOTING

### Problem: CORS-Fehler
**Lösung**: Überprüfen Sie die `ALLOWED_ORIGINS` in Railway

### Problem: Datenbankverbindung fehlgeschlagen
**Lösung**: 
1. Überprüfen Sie die `DATABASE_URL`
2. Stellen Sie sicher, dass Remote-Zugriff aktiviert ist
3. Testen Sie die Verbindung mit einem MySQL-Client

### Problem: Frontend lädt nicht
**Lösung**:
1. Überprüfen Sie die FTP-Upload
2. Stellen Sie sicher, dass `index.html` im Root-Verzeichnis ist
3. Überprüfen Sie die Dateiberechtigungen

## 📊 MONITORING

### Railway Dashboard
- Logs: Railway Dashboard → Deployments → Logs
- Metriken: CPU, Memory, Network Usage
- Environment Variables: Settings → Variables

### World4You
- Traffic-Statistiken im Control Panel
- SSL-Status überprüfen
- Datenbank-Performance

## 🔄 UPDATES

### Backend-Updates
1. Push zu GitHub
2. Railway deployt automatisch
3. Migrationen werden automatisch ausgeführt

### Frontend-Updates
1. `npm run build` in `apps/web`
2. Upload der neuen `dist/` Dateien via FTP

## 🎉 FERTIG!

Ihre MotionContent-Anwendung ist jetzt live auf:
- **Frontend**: https://motioncontent.at
- **Backend**: https://your-railway-app.railway.app
- **Datenbank**: World4You MySQL

**Nächste Schritte:**
- Monitoring einrichten
- Backup-Strategie implementieren
- Performance optimieren
- Weitere Features entwickeln
