@echo off
echo =====================================================
echo  BD Roamer - Mobile Dev Startup
echo =====================================================
echo.

:: Get local IP address dynamically using PowerShell
for /f "usebackq tokens=*" %%i in (`powershell -Command "Get-NetRoute -DestinationPrefix '0.0.0.0/0' | Get-NetIPInterface | Get-NetIPAddress -AddressFamily IPv4 | Select-Object -ExpandProperty IPAddress -First 1"`) do (
    set LOCAL_IP=%%i
)

if "%LOCAL_IP%"=="" (
    set LOCAL_IP=127.0.0.1
)

echo Detected Local LAN IP: %LOCAL_IP%
echo.
echo [1/2] Starting Vite Dev Server (port 8080)...
start "Vite Dev Server" cmd /k "cd /d %~dp0 && npm run dev"
echo.
echo [2/2] Starting Expo (Scan QR with Expo Go)...
start "Expo Metro" cmd /k "cd /d %~dp0 && node scripts/start-mobile.js"
echo.
echo =====================================================
echo  Both servers starting in separate windows!
echo  - Vite Web App: http://%LOCAL_IP%:8080
echo  - Expo Metro:   exp://%LOCAL_IP%:8081
echo.
echo  STEPS:
echo  1. Wait for both windows to be ready
echo  2. Scan QR code with Expo Go app
echo  3. App will load your web app automatically
echo =====================================================
pause
