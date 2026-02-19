#!/bin/bash
# Quick Start Script for Numerology SaaS

echo "🚀 Starting Numerology SaaS Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! pgrep -q mongod; then
    echo "⚠️  MongoDB appears to not be running."
    echo "   Please start MongoDB with: mongod"
    read -p "   Press Enter when MongoDB is running..."
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install npm packages
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "📝 Setting up environment..."

# Create .env.local from template if it doesn't exist
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local from template"
    echo "   ⚠️  Please update .env.local with your settings if needed"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "🎯 Ready to run!"
echo ""
echo "Start both frontend and backend:"
echo "  npm run dev:all"
echo ""
echo "Or start separately:"
echo "  Terminal 1: npm run dev"
echo "  Terminal 2: npm run dev:server"
echo ""
echo "Then open: http://localhost:5173"
echo ""
