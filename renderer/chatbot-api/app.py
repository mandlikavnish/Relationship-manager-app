from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import requests

app = Flask(__name__)
CORS(app)

OLLAMA_PATH = r"C:\Users\rohit michael\.ollama\models\manifests\registry.ollama.ai\library\llama3"

def split_into_chunks(text):
    """Split text into shorter chunks of 1-2 sentences each"""
    import re
    
    if not text or len(text.strip()) < 10:
        return [text] if text else ['']
    
    # Split by sentence endings (., !, ?) followed by space or end of string
    # This regex handles multiple punctuation marks and preserves them
    sentences = re.split(r'([.!?]+(?:\s+|$))', text)
    
    # Rejoin sentences with their punctuation
    cleaned_sentences = []
    for i in range(0, len(sentences), 2):
        if i < len(sentences):
            sentence = sentences[i].strip()
            if i + 1 < len(sentences):
                sentence += sentences[i + 1]
            if sentence:
                cleaned_sentences.append(sentence.strip())
    
    # If no sentences found, try splitting by newlines or return as single chunk
    if not cleaned_sentences:
        # Try splitting by newlines
        cleaned_sentences = [s.strip() for s in text.split('\n') if s.strip()]
        if not cleaned_sentences:
            return [text]
    
    chunks = []
    current_chunk = []
    
    for sentence in cleaned_sentences:
        current_chunk.append(sentence)
        # Group 1-2 sentences per chunk for faster feel
        if len(current_chunk) >= 2:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
    
    # Add remaining sentences
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    # Limit to max 3 chunks to keep it fast
    return chunks[:3]

# Direct and helpful system prompt
SYSTEM_PROMPT = """You are a supportive mental-health guidance assistant, not a licensed therapist or a replacement for professional therapy.
Your role is to provide calm, empathetic, and grounding responses that help users reflect, feel heard, and explore healthy coping strategies.

Core Behavior

Speak in a warm, gentle, and reassuring tone.

Keep responses concise, human, and conversational, like a real-life support chat.

Validate emotions without reinforcing harmful beliefs.

Encourage self-awareness, emotional regulation, and small actionable steps.

Offer practical coping techniques, grounding exercises, or reframing when appropriate.

Maintain a non-judgmental and respectful stance at all times.

Safety & Boundaries

Clearly acknowledge that you are not a replacement for therapy when situations become intense or clinical.

Never provide diagnoses, medical claims, or guarantees.

Do not encourage dependency—support autonomy and self-trust.

If a user expresses distress, gently suggest reaching out to trusted people or professionals without alarmism.

Avoid graphic, triggering, or absolute language.

Response Style

CRITICAL: Keep responses VERY SHORT - maximum 2-3 sentences per message. Split longer thoughts into multiple separate messages.

Each message should be concise (1-2 sentences max). This makes the conversation feel faster and more natural.

Do NOT repeat the same sentence structure or question over and over (avoid always saying things like \"Can you tell me more...?\" or \"Can you tell me more about...\").

Every reply should have two parts:
1) A short reflection + validation of what the user said (1 sentence).
2) One or two **practical suggestions, options, or next steps** based directly on what they shared.

After the user has described the situation in **2 or more messages**, shift into **solution mode**:
- Briefly summarize what you understood.
- Offer 2–3 concrete options or steps they could take next.
- Only ask a follow-up question if it helps them choose between those options.

Ask at most ONE short question, and only when it truly moves the conversation forward; many replies should have no question at all.

When the user clearly asks for help deciding (e.g. “what am I supposed to do?”, “should I stay or leave?”, “what should I do next?”), give 2–3 concrete paths they could consider, with pros/cons, instead of asking more questions.

Regularly (but not in every message) remind the user, in natural language, that you are **not a therapist or a replacement for professional help**, just a supportive guide helping them think and cope.

Use calming language like:

“It makes sense that you feel this way.”

“We can take this one step at a time.”

“You’re not alone in this.”

Guidance Principles

Focus on what the user can control right now.

Promote healthy habits: breathing, journaling, boundaries, rest, clarity.

Normalize uncertainty and emotional ups and downs.

When giving tips, keep them simple and doable.

Emotional Tone

Calm

Safe

Supportive

Grounded

Encouraging but realistic

Example Mindset (Internal)

“I’m here to help you pause, reflect, and move forward gently — not to fix you.”"""

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Chatbot API is running'})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        relationship_status = data.get('relationshipStatus', None)
        last_survey_date = data.get('lastSurveyDate', None)
        survey_answers = data.get('surveyAnswers', None)
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        print(f"Received message: {user_message}")
        if relationship_status:
            print(f"Relationship status context: {relationship_status}")
        
        # Build context-aware prompt with specific guidance
        context_info = ""
        if relationship_status:
            # Analyze survey answers to identify specific issues
            analysis = ""
            if survey_answers and relationship_status in ['Needs Work', 'Bad']:
                low_scores = []
                if int(survey_answers.get('satisfaction', 5)) <= 2:
                    low_scores.append("low overall satisfaction")
                if int(survey_answers.get('emotional_support', 5)) <= 2:
                    low_scores.append("lack of emotional support")
                if int(survey_answers.get('appreciation', 5)) <= 2:
                    low_scores.append("difficulty sharing thoughts/feelings")
                if int(survey_answers.get('conflict_handling', 5)) <= 2:
                    low_scores.append("poor conflict resolution")
                if int(survey_answers.get('feeling_valued', 5)) <= 2:
                    low_scores.append("not feeling valued")
                if int(survey_answers.get('quality_time', 5)) <= 2:
                    low_scores.append("partner not listening during conflicts")
                if int(survey_answers.get('apology', 5)) <= 2:
                    low_scores.append("partner not taking responsibility/apologizing")
                
                if low_scores:
                    analysis = f"\nSpecific issues identified: {', '.join(low_scores)}. Address these areas specifically.\n"
            
            if relationship_status == 'Good Job':
                context_info = """
IMPORTANT CONTEXT: The user's relationship survey shows their relationship is in a GOOD place.
- Give encouraging, positive reinforcement
- Suggest ways to maintain and strengthen their bond
- Celebrate their healthy relationship
- Offer tips to keep the connection strong
- Be warm and supportive
"""
            elif relationship_status == 'Needs Work':
                context_info = f"""
IMPORTANT CONTEXT: The user's relationship survey shows their relationship NEEDS WORK.
{analysis}
- Identify what might be going wrong based on the survey results
- Provide specific, actionable advice to improve their relationship
- Focus on practical solutions: better communication, spending quality time, resolving conflicts
- Address the specific low-scoring areas from their survey
- Be supportive but honest about areas that need improvement
- Give concrete steps they can take to improve
"""
            elif relationship_status == 'Bad':
                context_info = f"""
IMPORTANT CONTEXT: The user's relationship survey shows their relationship is in BAD condition.
{analysis}
- Be empathetic and understanding
- Identify serious issues based on their survey: lack of emotional support, poor conflict resolution, feeling unvalued, etc.
- Address the specific problems revealed in their survey answers
- Provide guidance on seeking professional help or counseling
- Suggest difficult but necessary conversations
- Focus on what needs to change urgently
- Be supportive but realistic about the situation
"""
            context_info = f"\n\n{context_info}\nUse this context to provide personalized, relevant advice based on their relationship status.\n"
        
        # Construct the prompt with context
        full_prompt = f"{SYSTEM_PROMPT}{context_info}\n\nUser: {user_message}\nAssistant:"
        
        # Try using Ollama's API endpoint first
        ollama_url = "http://localhost:11434/api/generate"
        payload = {
            "model": "llama3",
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": 0.8,
                "num_predict": 80  # Shorter responses for faster, chunked messages
            }
        }
        
        try:
            response = requests.post(ollama_url, json=payload, timeout=60)
            if response.status_code == 200:
                result = response.json()
                bot_response = result.get('response', '').strip()
                
                # Clean up the response
                if full_prompt in bot_response:
                    bot_response = bot_response.replace(full_prompt, '').strip()
                
                # Split response into shorter chunks (2-3 sentences each)
                messages = split_into_chunks(bot_response)
                
                print(f"Sending {len(messages)} message chunks")
                return jsonify({'response': messages})
            else:
                print(f"Ollama API error: {response.status_code} - {response.text}")
                return jsonify({'error': f'Ollama API error: {response.status_code}'}), 500
                
        except requests.exceptions.ConnectionError:
            # Fallback to subprocess if API not available
            print("Ollama API not available, trying subprocess...")
            cmd = f'ollama run llama3 "{full_prompt}" --temperature 0.8 --num-predict 80'
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=60)
            
            if result.returncode == 0:
                response_text = result.stdout.strip()
                # Clean up the response
                if full_prompt in response_text:
                    response_text = response_text.replace(full_prompt, '').strip()
                
                # Split response into shorter chunks
                messages = split_into_chunks(response_text)
                return jsonify({'response': messages})
            else:
                error_msg = result.stderr or "Unknown error"
                print(f"Ollama subprocess error: {error_msg}")
                return jsonify({'error': f'Failed to get response from Llama 3: {error_msg}'}), 500
            
    except Exception as e:
        print(f"Exception in chat endpoint: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = 5001
    print(f"Starting Chatbot API on http://localhost:{port}")
    print("Make sure Ollama is running!")
    app.run(host='0.0.0.0', port=port, debug=True)
