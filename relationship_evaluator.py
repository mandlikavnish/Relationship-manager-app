from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Weights for each survey question (1–5 scale per answer)
QUESTION_WEIGHTS = {
    # Relationship satisfaction
    "satisfaction": 3,
    "emotional_support": 3,
    "appreciation": 3,
    "conflict_handling": 3,
    "feeling_valued": 3,
    "quality_time": 2,
    "apology": 3,

    # Communication (from communication.html)
    "comm_preference": 2,
    "disagreements": 3,
    "expression": 2,
    "listening": 3,

    # Memories
    "new_memories": 2,
    "reminisce": 1,
    "souvenirs": 1,
    "revisit": 1,

    # Future plans
    "goals": 3,
    "aligned": 3,
    "financial": 2,
    "life_changes": 2,

    # Preferences / personality
    "hobbies": 1,
    "shared_activities": 2,
    "social_preference": 1,
    "understanding": 2,
    "respect": 2,
}


def calculate_score(answers: dict) -> tuple[float, float, float]:
    """Return (total_score, max_score, ratio 0–1) based on weighted answers."""
    total = 0.0
    max_total = 0.0

    for key, weight in QUESTION_WEIGHTS.items():
        if key not in answers:
            # Skip unanswered or missing values
            continue

        try:
            value = float(answers[key])
        except (TypeError, ValueError):
            continue

        # Clamp between 1 and 5 just in case
        value = max(1.0, min(5.0, value))

        total += value * weight
        max_total += 5.0 * weight

    if max_total == 0:
        return 0.0, 0.0, 0.0

    ratio = total / max_total
    return total, max_total, ratio


def categorize_relationship(ratio: float) -> tuple[str, str]:
    """
    Map score ratio into one of three categories and messages:
    - happy:       "Congrats, you are a happy couple."
    - needs_work:  "Your relationship needs some work."
    - bad:         "Your relationship is in a bad condition."
    """
    if ratio >= 0.75:
        return (
            "happy",
            "\n".join(
                [
                    "Congrats, you are a happy couple.",
                    "",
                    "What this usually means:",
                    "• You feel supported and appreciated",
                    "• You communicate well (even during conflict)",
                    "• Your future plans and values are fairly aligned",
                    "",
                    "Keep it strong:",
                    "• Protect 1 quality moment every day (even 10 minutes)",
                    "• Say one specific appreciation out loud",
                    "• Plan one fun shared activity this week",
                ]
            ),
        )
    if ratio >= 0.5:
        return (
            "needs_work",
            "\n".join(
                [
                    "Your relationship needs some work.",
                    "",
                    "Good news: this is very fixable with consistent effort.",
                    "",
                    "Try this for the next 7 days:",
                    "• 15 minutes of distraction-free talk time",
                    "• Repeat back what you heard before responding",
                    "• One small act of care (help, compliment, check-in)",
                    "",
                    "If you do this, your score usually improves fast.",
                ]
            ),
        )
    return (
        "bad",
        "\n".join(
            [
                "Your relationship is in a bad condition.",
                "",
                "This suggests key areas like support, trust, or communication may be hurting right now.",
                "",
                "What to do next (practical, not judgmental):",
                "• Pause arguments when emotions spike; resume when calm",
                "• Choose one issue to solve at a time (not everything at once)",
                "• Consider a neutral third party (counselor/mentor) if stuck",
                "",
                "You can still turn this around, but it needs attention soon.",
            ]
        ),
    )


@app.post("/evaluate")
def evaluate():
    data = request.get_json(force=True) or {}
    answers = data.get("answers") or {}

    total, max_total, ratio = calculate_score(answers)
    category, message = categorize_relationship(ratio)

    return jsonify(
        {
            "category": category,
            "message": message,
            "score": total,
            "max_score": max_total,
            "ratio": ratio,
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

