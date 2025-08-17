@echo off
echo 🚀 Setting up PakShopper Frontend Project...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version 18+ is required. Current version: 
    node --version
    echo Please update Node.js to continue.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version: 
npm --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies. Please check the error above.
    pause
    exit /b 1
)

REM Create .env.local file if it doesn't exist
if not exist .env.local (
    echo 🔧 Creating .env.local file...
    (
        echo # PakShopper Environment Variables
        echo NEXT_PUBLIC_SITE_URL=http://localhost:3000
        echo NEXT_PUBLIC_SITE_NAME=PakShopper
    ) > .env.local
    echo ✅ .env.local file created!
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the development server:
echo   npm run dev
echo.
echo To build for production:
echo   npm run build
echo   npm start
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.
echo 📚 Check README.md for more information
echo 🎨 Check DESIGN_SYSTEM.md for design guidelines
echo.
pause

