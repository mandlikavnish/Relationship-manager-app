@echo off
echo ========================================
echo Starting Relationship ML API and Chatbot API...
echo ========================================
echo.

cd /d "%~dp0"

echo Starting ML API (Port 5000)...
start "ML API (Port 5000)" cmd /k "cd /d %~dp0renderer\relationship-ml-api && python app.py"
timeout /t 3 /nobreak >nul

echo Starting Chatbot API (Port 5001)...
start "Chatbot API (Port 5001)" cmd /k "cd /d %~dp0renderer\chatbot-api && python app.py"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo Both APIs are starting in separate windows.
echo ========================================
echo.
echo ML API: http://localhost:5000/predict
echo Chatbot API: http://localhost:5001/chat
echo.
echo IMPORTANT: Make sure Ollama is running!
echo Check if APIs started successfully in the windows above.
echo.
echo Press any key to exit this window (APIs will continue running)...
pause >nul


