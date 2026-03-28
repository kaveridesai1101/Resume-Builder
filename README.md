# AI Resume Builder 🚀

A modern, full-stack web application designed to empower users to effortlessly build highly professional, ATS-optimized, and densely formatted resumes. By integrating a lightning-fast AI engine with a responsive UI and robust backend infrastructure, this platform guides users step-by-step to craft industry-grade resumes and exports them into sophisticated, multi-page A4 PDFs.

## 🌟 Key Features

- **AI "Lindy-Style" Auto-Filler**: Click "Suggest with AI" and just enter a few thoughts. The system retrieves prestige-formatted metrics (e.g., *"Developed high-impact marketing campaigns utilizing data-driven analysis..."*) perfectly formatted into professional bullet points.
- **Active Keyword Matching**: Provides an actionable checklist of strengths and warnings on the user's dashboard, detailing exactly which keywords to incorporate to avoid the ATS "black hole".
- **Unbreakable PDF Renderer**: Advanced client-side `html2pdf.js` rendering pipeline. Guarantees flawless multi-page formatting with intelligent page breaks (`.prevent-page-break`) so paragraphs are never cut in half mid-sentence.

## 🛠️ Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React (Icons), `html2pdf.js` (PDF Engine)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose (Models)
- **Authentication & Security:** JWT (JSON Web Tokens), `bcryptjs` (Password Hashing), Email OTP Verification
- **AI Engine:** Groq Cloud Platform (`llama-3.3-70b-versatile` model)

## 🏗️ Architecture Highlights

- **Secure Authentication Flow**: Robust login/registration endpoints featuring case-insensitivity and automatic trimming of hidden trailing spaces to eliminate common mobile login bugs. Fail-safe OTP email verification prevents unverified abuse of AI.
- **Resilient AI Parsing**: Backend JSON parser employs an Abstract Syntax Tree (AST) fallback to gracefully handle unescaped characters, unexpected newlines, or trailing commas from the LLM seamlessly.
- **Live Algorithmic ATS Scoring**: Real-time algorithmic score derived dynamically from the backend (`/api/ats/score`), replacing basic hardcoded completeness metrics.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB URI (Atlas or local)
- Groq Cloud API Key

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd Resume-tast-2
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

*(You will need to configure your environment variables (e.g., MongoDB connection string, JWT secret, and Groq API Key) in both your frontend/backend directories as appropriate).*

### Running the Application

**Start the Backend API:**
```bash
cd backend
npm run dev
```

**Start the Frontend App:**
```bash
npm run dev
```

---

*This project was developed to create impeccable multi-page resume outputs perfectly suited to pass standard corporate screening mechanisms.*
