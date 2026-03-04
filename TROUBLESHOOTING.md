# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "Error when submitting survey"
**Solution:**
1. Make sure the relationship evaluation server is running on port 5000
2. In a terminal, run:
   ```bash
   cd relationship-agent
   python relationship_evaluator.py
   ```
3. Check the terminal - you should see "Running on http://0.0.0.0:5000"

### Issue 2: "Sorry, trouble connecting to server" (Chatbot)
**Solution:**
1. Make sure Chatbot API is running on port 5001
2. Double-click `start_apis.bat` or manually run:
   ```bash
   cd renderer\chatbot-api
   python app.py
   ```
3. Make sure Ollama is running:
   ```bash
   ollama serve
   ```
4. Check if Llama 3 model is available:
   ```bash
   ollama list
   ```

### Issue 3: APIs won't start
**Check:**
1. Python is installed: `python --version`
2. Dependencies are installed:
   ```bash
   pip install flask flask-cors
   
   cd renderer\chatbot-api
   pip install -r requirements.txt
   ```
3. Ports are not in use:
   - Close any other apps using ports 5000 or 5001

### Issue 4: "Module not found" errors
**Solution:**
```bash
pip install flask flask-cors
```

### Quick Check Script
Run `check_apis.bat` to verify:
- Relationship evaluation server is running (port 5000)
- Chatbot API is running (port 5001)
- Ollama is accessible

## Step-by-Step Startup

1. **Start Ollama** (if not running as service):
   ```bash
   ollama serve
   ```

2. **Start APIs**:
   - Double-click `start_apis.bat`
   - OR manually start both in separate terminals

3. **Start Electron App**:
   ```bash
   npm start
   ```

## Testing the APIs

### Test relationship evaluation API:
Open browser: `http://localhost:5000/evaluate`
(Should show an error page - that's normal, it expects POST requests)

### Test Chatbot API:
Open browser: `http://localhost:5001/chat`
(Should show an error page - that's normal, it expects POST requests)

## Still Having Issues?

1. Check all terminal windows for error messages
2. Make sure all dependencies are installed
3. Verify Python version (3.7+)
4. Check firewall isn't blocking ports 5000/5001

