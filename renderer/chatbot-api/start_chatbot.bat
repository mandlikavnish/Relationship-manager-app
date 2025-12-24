@echo off
echo ========================================
echo Starting Chatbot API
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Ollama...
ollama list >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Ollama is not accessible!
    echo Please make sure Ollama is installed and running.
    echo Run: ollama serve
    pause
    exit /b 1
)

echo [OK] Ollama is accessible
echo.

echo Installing/updating dependencies...
pip install -r requirements.txt --quiet

echo.
echo Starting Chatbot API on port 5001...
echo.
python app.py

pause

