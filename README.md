# Saharsh Srivastava | Interactive AI-Native Portfolio

A modern, highly interactive personal portfolio website showcasing projects, experience, and technical skills in AI and Software Engineering. Built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **🤖 Integrated AI Assistant:** A mock chatbot interface simulating a personal AI assistant to answer questions about the resume contextually.
- **💻 Terminal Widget:** A simulated command-line interface mimicking an AI/ML model deployment boot-up sequence.
- **🎨 Cyber-Themed UI:** Dark mode by default, featuring glassmorphism, neon glow accents (Cyan and Purple), and a dynamic interactive custom cursor.
- **⚡ Fluid Animations:** Smooth page transitions, staggered entry animations, and interactive hover effects powered by `motion` (Framer Motion).
- **📱 Fully Responsive:** Carefully optimized layout for both mobile, tablet, and desktop viewing experiences.
- **📄 Data-Driven Structure:** All resume data (experience, skills, projects) is cleanly isolated in a single `data.ts` file for incredibly easy maintenance.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Motion (Framer Motion)](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saharsh8/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` (or the local port provided in your terminal).

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (if separated)
├── App.tsx          # Main application file & layout
├── data.ts          # Centralized resume and portfolio data
├── index.css        # Global styles & Tailwind configuration
└── main.tsx         # React application entry point
```

## ⚙️ Customizing Your Data

The portfolio is designed to be easily customizable without having to dig deep into the component tree. All personal information is stored centrally.

1. Open `src/data.ts`
2. Modify the `RESUME_DATA` object with your own details, including basics, experience, projects, and skills.
3. The React UI will automatically map and populate the new data across all sections and the AI Chatbot's context.

## 🔗 Links

- **LinkedIn:** [Saharsh Srivastava](https://linkedin.com/in/saharsh-srivastava)
- **GitHub:** [@saharsh8](https://github.com/saharsh8)

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
