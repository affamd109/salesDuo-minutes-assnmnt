# Meeting Notes Processor API

This is a simple Express.js backend API that processes meeting notes using Google’s Gemini generative AI model.  
You can send meeting notes either as a `.txt` file upload or as raw text in the request body, and the API returns a JSON response with a summary, decisions, and action items.

---

## Before You Begin

1. **Obtain a Gemini API Key** (free tier available):
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create and copy your API key

2. **Local Development**:
   - The server runs on `localhost:3000` by default
   - Change the `PORT` in `.env` if needed

3. **Security Warning**:
   - Never commit `.env` to version control!
   - Add `.env` to your `.gitignore`

## 🚀 Setup Instructions

1. **Clone the repo or unzip the folder**  
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
