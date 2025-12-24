# ML and Chatbot Integration Flow

## Complete Flow

### 1. User Completes Survey (relationship.html)
- User answers 7 questions (1-5 scale)
- Form submits to ML API at `http://localhost:5000/predict`
- ML API returns prediction: "Good", "Needs Work", or "Bad"
- Prediction is stored in:
  - Firebase (for records)
  - localStorage (for chatbot context)

### 2. Prediction Storage
```javascript
localStorage.setItem('relationshipStatus', prediction.result);
localStorage.setItem('lastSurveyDate', new Date().toISOString());
```

### 3. Chatbot Uses Context (surveys.html)
- When user chats, chatbot receives:
  - User's message
  - Relationship status (from localStorage)
  - Last survey date
- Chatbot API uses this context to provide personalized advice

### 4. Context-Aware Responses
The chatbot adapts its responses based on relationship status:

- **Good**: Encouraging, supportive guidance to maintain strength
- **Needs Work**: Practical advice and communication strategies
- **Bad**: Empathetic support, guidance on seeking help

## API Endpoints

### ML API (Port 5000)
- **POST** `/predict`
- **Input**: `{ "features": [1,2,3,4,5,1,2] }` (7 values, 1-5 scale)
- **Output**: `{ "result": "Good" | "Needs Work" | "Bad" }`

### Chatbot API (Port 5001)
- **POST** `/chat`
- **Input**: 
  ```json
  {
    "message": "user message",
    "relationshipStatus": "Good" | "Needs Work" | "Bad" | null,
    "lastSurveyDate": "ISO date string" | null
  }
  ```
- **Output**: `{ "response": ["message1", "message2", ...] }`

## Testing

1. **Test ML API**:
   ```bash
   curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"features": [5,5,5,5,5,5,5]}'
   ```

2. **Test Chatbot with Context**:
   ```bash
   curl -X POST http://localhost:5001/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I need help", "relationshipStatus": "Needs Work"}'
   ```

## Files Modified

1. **relationship.html**: Stores prediction in localStorage
2. **surveys.html**: Sends relationship status to chatbot
3. **chatbot-api/app.py**: Uses relationship status for context-aware responses
4. **relationship-ml-api/app.py**: Improved error handling and validation

## Next Steps

1. Make sure both APIs are running:
   - ML API: `cd renderer/relationship-ml-api && python app.py`
   - Chatbot API: `cd renderer/chatbot-api && python app.py`

2. Complete a survey to set the relationship status

3. Chat with the bot - it will use your relationship status for personalized advice!

