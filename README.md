# OrbitIQ – Real-Time ISS & AI News Intelligence Dashboard

> **🚀 Now live with N2YO API and DeepSeek AI integration!**

A modern, futuristic, AI-powered web application providing live telemetry of the International Space Station (ISS), current astronauts in space, and an intelligent news dashboard filtered for tech and space insights. Features a built-in AI assistant powered by DeepSeek-V4-Pro to answer questions directly from live context.

## 🚀 Features

- **Live ISS Tracking**: Real-time map displaying current ISS location, trajectory, and speed calculated using Haversine formula.
- **Astronaut Roster**: View who is currently aboard the ISS.
- **AI News Intelligence**: Tech and Space news aggregated via NewsAPI with visual doughnut charts for source distribution.
- **Floating AI Chatbot**: Context-aware assistant utilizing Mistral-7B to answer questions about current ISS status and news headlines.
- **Futuristic UI/UX**: Glassmorphism, smooth Framer Motion animations, dark/light modes, and interactive data visualizations.

## 🛠 Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Maps**: Leaflet.js / React-Leaflet
- **Charts**: Recharts
- **API Calls**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## ⚙️ Setup Instructions

### 1. Clone & Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Copy the `.env.example` file to a new `.env` file and add your API keys:
\`\`\`bash
cp .env.example .env
\`\`\`
Edit `.env` to include:
- \`VITE_NEWS_API_KEY=\`: Get one from [NewsAPI.org](https://newsapi.org/)
- \`VITE_AI_TOKEN=\`: Get a token from [HuggingFace](https://huggingface.co/settings/tokens)

### 3. Run Locally
\`\`\`bash
npm run dev
\`\`\`
Visit \`http://localhost:5173\` in your browser.

## 🚀 Deployment (Vercel)

This application is configured and ready to be deployed on Vercel.

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. In the Vercel dashboard, configure the Environment Variables:
   - \`VITE_NEWS_API_KEY\`
   - \`VITE_AI_TOKEN\`
4. Deploy!

> **Note on NewsAPI**: The free tier of NewsAPI only works when requests are made from \`localhost\`. If deploying to a public URL on Vercel, you will need a paid plan or an alternative News provider.
