# XLabs - Official Website

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm (comes with Node.js) or yarn
- Git

### 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/x-labs-myid/official-site-xlabs-react.git
   cd official-site-xlabs-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Environment setup**
   Copy the `.env.example` file to `.env` and update the values as needed.

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. 📦 Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be available in the dist directory.

## 🛠️ Tech Stack

- Frontend Framework: React 19
- Language: TypeScript 5
- Build Tool: Vite 4
- Styling: Tailwind CSS 4 + DaisyUI
- State Management: Jotai
- Form Handling: React Hook Form + Zod
- Routing: React Router DOM
- Linting: ESLint
- Code Formatting: Prettier

## 📁 Project Structure

```
official-site-xlabs-react/
├── public/                           # Static files
├── src/                              # Source code
│   ├── landing-page/                 # Facing landing page
│   |   ├── components/               # Landing page specific components
│   |   ├── views/                    # Landing page specific views
│   |   ├── api/                      # Landing page API calls
│   |   ├── routes/                   # Landing page route definitions
│   |   ├── types/                    # Landing page type definitions
│   ├── xyz-panel/                    # Facing XYZ panel
│   |   ├── api/                      # XYZ panel API calls
│   |   ├── modules/                  # XYZ panel specific modules
│   |   ├── types/                    # XYZ panel type definitions
│   |   ├── utils/                    # XYZ panel utility functions
│   |   ├── routes/                   # XYZ panel route definitions
│   ├── assets/                       # Images, fonts, etc.
│   ├── components/                   # Reusable UI components Global
│   ├── hooks/                        # Custom React hooks
│   ├── store/                        # State management (Jotai)
│   ├── App.tsx                       # Main App component
│   └── main.tsx                      # Application entry point
├── .eslintrc.js                      # ESLint configuration
├── .env                              # Environment variables
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore file
├── package.json                      # Project dependencies and scripts
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite configuration
```
