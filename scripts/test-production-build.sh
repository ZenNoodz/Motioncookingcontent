#!/bin/bash

# Production Build Test Script
# Testet den Production Build lokal

echo "🚀 PRODUCTION BUILD TEST"
echo "========================"

# Frontend Build
echo "📦 Building Frontend..."
cd apps/web
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend Build erfolgreich!"
else
    echo "❌ Frontend Build fehlgeschlagen!"
    exit 1
fi

# Backend Build
echo "📦 Building Backend..."
cd ../server
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Backend Build erfolgreich!"
else
    echo "❌ Backend Build fehlgeschlagen!"
    exit 1
fi

echo ""
echo "🎉 ALLE BUILDS ERFOLGREICH!"
echo ""
echo "📋 Nächste Schritte:"
echo "1. Railway Account erstellen: https://railway.app"
echo "2. World4You MySQL Datenbank einrichten"
echo "3. DEPLOYMENT.md befolgen"
echo ""
echo "📁 Build-Dateien:"
echo "   Frontend: apps/web/dist/"
echo "   Backend:  apps/server/dist/"
