# Fix Chatbot Connection Issue

## Quick Fix Steps:

### Step 1: Make sure Ollama is running
Open a terminal and check:
```bash
ollama list
```

If it doesn't work, start Ollama:
```bash
ollama serve
```
(Keep this terminal open)

### Step 2: Start the Chatbot API

**Option A: Use the batch file**
Double-click: `renderer\chatbot-api\start_chatbot.bat`

**Option B: Manual start**
```bash
cd renderer\chatbot-api
python app.py
```

You should see:
```
Starting Chatbot API on http://localhost:5001
Make sure Ollama is running!
```

### Step 3: Verify it's working

Open your browser and go to:
```
http://localhost:5001/health
```

You should see: `{"status":"ok","message":"Chatbot API is running"}`

### Step 4: Test in your app

1. Refresh your Electron app
2. Go to surveys page
3. Try the chatbot

## What I Fixed:

1. ✅ Improved Ollama connection (tries API first, falls back to subprocess)
2. ✅ Added better error handling and logging
3. ✅ Added health check endpoint
4. ✅ Added requests library for better API calls
5. ✅ Created startup script with Ollama check

## Common Issues:

**"Connection refused"**
- Chatbot API is not running
- Start it using Step 2 above

**"Ollama not found"**
- Ollama is not running
- Start it: `ollama serve`

**"Model not found"**
- Llama 3 model not installed
- Install it: `ollama pull llama3`

## Still Not Working?

1. Check the Chatbot API terminal for error messages
2. Make sure port 5001 is not used by another app
3. Check Windows Firewall isn't blocking it
4. Try the health endpoint in browser first

