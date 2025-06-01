# AI-Powered Meeting Minutes Extractor

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react)
![Gemini API](https://img.shields.io/badge/Google%20Gemini-API-blueviolet?logo=google)
[![Deploy Backend on Render](https://img.shields.io/badge/Backend-Render-blue?logo=render)](https://render.com)
[![Deploy Frontend on Render](https://img.shields.io/badge/Frontend-Render-blue?logo=render)](https://render.com)


This is a Node.js+ Express.js backend API that processes meeting notes using Google’s Gemini generative AI model.  
You can send meeting notes either as a `.txt` file upload or as raw text in the request body, and the API returns a JSON response with a summary, decisions, and action items.

### 🔗 Live Website  
👉 [mins-of-meetings-frontend.onrender.com](https://mins-of-meetings-frontend.onrender.com)

---

## ✨ Features

- 🔍 Accepts both raw text input and `.txt` file uploads
- 🧠 Uses Google Gemini API to extract:
  - ✅ Summary of the meeting
  - 📌 Key decisions made
  - 📋 Action items assigned
- ⚡ Fast and lightweight Node.js + Express.js backend
- 🛡️ Secure environment variable support using `.env`
- 🔄 Frontend made by  React.
- 🧪 Built-in error handling for common input and API failures
- Responsive design - Built for both laptops and mobiles.


## Before You Begin

1. **Obtain a Gemini API Key** (free tier available):
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create and copy your API key

2. **Local Development**:
   - The server runs on `localhost:3000` by default

3. **Security Warning**:
   - Never commit `.env` to version control!
   - Add `.env` to your `.gitignore`
  

## 🚀 Setup Instructions

1. **Clone the repository and navigate into the project directory:**  
   ```bash
   git clone https://github.com/affamd109/salesDuo-minutes-assnmnt.git
   cd salesDuo-minutes-assnmnt
   ```
2. **Install baackend dependencies** 

```bash
cd backend
npm install

```
3.**Open the project in VS Code (or any code editor)**

4.**Create a new .env file in the backend directory and add:**
   ```bash
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
5. **Change your directory back to root and run these commands to install frontend dependencies :** 

```bash
cd frontend
npm install

```

##  🖥️ Running the App Locally
✅ Start the backend server

```bash
cd backend
npm run dev
```
"Server running on 3000" will be printed out on your terminal after starting the server.

✅ Start the frontend server (Open a new terminal):

```bash
cd frontend
npm run dev

```



---

### 📌 1. Testing with Postman (Postman link : https://www.postman.com/)

#### 🔹 Option A: Upload `.txt` File

- Set method to `POST`
- Set URL: `http://localhost:3000/process-meeting`
- Go to **Body** → **form-data**
  - Key: `file` (type: File)
  - Value: upload your `.txt` file
- Hit **Send**



#### 🔹 Option B: Raw Text Input

- Set method to `POST`
- Set URL: `http://localhost:3000/process-meeting`
- Go to **Body** → **raw**
- Select **Text** (from dropdown)
- Paste your meeting notes in plain text
- Hit **Send**

---

### 🧪 2. Testing with curl
#### Run the following commands in your terminal 

#### 🔹 Option A: Upload `.txt` File

```bash
curl -X POST http://localhost:3000/process-meeting \
  -H "Content-Type: multipart/form-data" \
  -F "file=@uploads/sample1.txt"

```
#### 🔹 Option B: Raw Text Input
```bash
curl -X POST http://localhost:3000/process-meeting \
  -H "Content-Type: text/plain" \
  --data "Your meetings points go here"
```
---

### 📌 Example of sample output using either postman or curl

#### Sample input : 

```bash
Sprint Meeting – May 28

- Finalize sprint backlog by June 1.  
- Raj will update the API documentation by June 2.  
- QA team to review and complete test cases by June 3.  
- The team agreed to adopt new coding standards starting next sprint.  
- No blockers or major issues reported this week.

```

#### Output:

```json
{
    "summary": "The sprint meeting on May 28th covered sprint backlog finalization, API documentation updates, QA test case completion, and the adoption of new coding standards in the next sprint.  No significant roadblocks were reported.",
    "decisions": [
        "Adopt new coding standards starting next sprint."
    ],
    "actionItems": [
        {
            "task": "Finalize sprint backlog",
            "owner": null,
            "due": "June 1"
        },
        {
            "task": "Update API documentation",
            "owner": "Raj",
            "due": "June 2"
        },
        {
            "task": "Review and complete test cases",
            "owner": "QA team",
            "due": "June 3"
        }
    ]
}
```


## 🛠️ Tech Stack

### 🧩 Frontend
- React.js (with Vite)
- Tailwind CSS

### 🔧 Backend
- Node.js
- Express.js
- Google Gemini API (via REST)

### 🌐 Full Stack
- RESTful API architecture
- JSON-based communication
- File handling via `multipart/form-data`
- Environment variables managed via `.env`

### 🧪 Dev Tools
- Render (for deployment)
- VS Code 
- Git & GitHub (version control)
