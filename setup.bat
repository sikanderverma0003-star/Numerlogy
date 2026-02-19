@echo off
REM Quick Start Script for Numerology SaaS (Windows)

echo.
echo 🚀 Starting Numerology SaaS Setup...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Check MongoDB
echo Checking MongoDB connection...
tasklist | find /i "mongod.exe" >nul
if errorlevel 1 (
    echo ⚠️  MongoDB does not appear to be running.
    echo.
    echo Please start MongoDB with one of these commands:
    echo  - mongod
    echo  - Or visit: https://docs.mongodb.com/manual/installation/
    echo.
    pause
)

echo.
echo 📦 Installing dependencies...
echo.

REM Install npm packages
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed!
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local from template...
    copy .env.local.example .env.local >nul
    echo ✅ Created .env.local
    echo ⚠️  Please update .env.local with your settings
) else (
    echo ℹ️  .env.local already exists
)

echo.
echo 🎯 Setup Complete!
echo.
echo Next Steps:
echo ============
echo 1. Make sure MongoDB is running (mongod)
echo.
echo 2. Start the application:
echo    npm run dev:all
echo.
echo    Or use separate terminals:
echo    Terminal 1: npm run dev
echo    Terminal 2: npm run dev:server
echo.
echo 3. Open browser: http://localhost:5173
echo.
echo 4. Sign up or log in to test the application
echo.
pause
