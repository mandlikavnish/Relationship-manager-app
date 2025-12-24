@echo off
echo Checking if APIs are running...
echo.

echo Checking ML API (Port 5000)...
netstat -ano | findstr :5000 >nul
if %errorlevel% == 0 (
    echo [OK] ML API is running on port 5000
) else (
    echo [ERROR] ML API is NOT running on port 5000
    echo Please start it by running: cd renderer\relationship-ml-api ^&^& python app.py
)

echo.
echo Checking Chatbot API (Port 5001)...
netstat -ano | findstr :5001 >nul
if %errorlevel% == 0 (
    echo [OK] Chatbot API is running on port 5001
) else (
    echo [ERROR] Chatbot API is NOT running on port 5001
    echo Please start it by running: cd renderer\chatbot-api ^&^& python app.py
)

echo.
echo Checking Ollama...
ollama list >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Ollama is installed and accessible
) else (
    echo [ERROR] Ollama is not accessible
    echo Please make sure Ollama is installed and running
)

echo.
pause

