# How to Run Your App

## Quick Start (3 Steps)

### Step 1: Make sure Ollama is running
Open a terminal and run:
```bash
ollama serve
```
Or if Ollama is already running as a service, you can skip this step.

### Step 2: Start the APIs
Double-click `start_apis.bat` in the `collegecode` folder
- This will open 2 windows:
  - **ML API** on port 5000 (for survey predictions)
  - **Chatbot API** on port 5001 (for Llama 3 chatbot)

### Step 3: Start your Electron app
Open a new terminal and run:
```bash
cd C:\Users\rohit michael\new_lmr\collegecode
npm start
```

---

## What Each Component Does:

1. **Ollama** - Runs Llama 3 model locally
2. **ML API (Port 5000)** - Takes survey data → Returns "Good", "Needs Work", or "Bad"
3. **Chatbot API (Port 5001)** - Powers the chatbot on surveys.html page
4. **Electron App** - Your main application window

---

## URLs/Links:

- **ML API**: http://localhost:5000/predict
- **Chatbot API**: http://localhost:5001/chat
- **Your App**: Opens in Electron window (no URL needed)

---

## Troubleshooting:

**If APIs don't start:**
- Make sure Python is installed: `python --version`
- Install dependencies: 
  ```bash
  cd renderer\relationship-ml-api
  pip install -r requirements.txt
  cd ..\chatbot-api
  pip install -r requirements.txt
  ```

**If Ollama doesn't work:**
- Make sure Ollama is installed
- Check if Llama 3 model is available: `ollama list`
- If not, pull it: `ollama pull llama3`

**If ports are busy:**
- Close other applications using ports 5000 or 5001
- Or change ports in the app.py files

