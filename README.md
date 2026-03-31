# Relationship Agent

A web-based relationship health tracker that helps couples reflect on their relationship through surveys, communication tools, and personalized insights.

## Features

- Relationship health surveys & scoring
- Communication tracking
- Shared memories, calendar, and plans
- Contact management
- Notifications and feedback system
- Secure login with profile management

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask, Flask-CORS)

## Getting Started

### Prerequisites

- Python 3.8+

### Installation

```bash
git clone https://github.com/rohitmichael-alt/webproject.git
cd webproject
pip install -r requirements.txt
```

### Running the Backend

```bash
python relationship_evaluator.py
```

The Flask server will start at `http://localhost:5000`.

### Running the Frontend

Open `index.html` directly in your browser, or serve it with any static file server:

```bash
# Using Python's built-in server
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Project Structure

```
webproject/
├── index.html              # Entry point
├── homepage.html           # Main dashboard
├── relationship.html       # Relationship overview
├── surveys.html            # Health survey
├── communication.html      # Communication tracker
├── memories.html           # Shared memories
├── calendar.html           # Shared calendar
├── plans.html              # Future plans
├── contacts.html           # Contact management
├── profile.html            # User profile
├── settings.html           # App settings
├── relationship_evaluator.py  # Flask backend
├── requirements.txt        # Python dependencies
└── renderer/               # JS and CSS assets
```

## GitHub

[https://github.com/rohitmichael-alt/webproject](https://github.com/rohitmichael-alt/webproject)
