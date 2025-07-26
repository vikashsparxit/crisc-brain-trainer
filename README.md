# CRISC Brain Trainer 🧠

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.0-000000.svg)](https://ui.shadcn.com/)

A personalized learning tool for ISACA CRISC certification preparation with AI-generated questions and motivational feedback. Built with modern React, TypeScript, and shadcn/ui for an exceptional user experience.

## 🎯 Demo

Experience the CRISC Brain Trainer live: [Demo Link Coming Soon]

> **Note**: This is a work in progress. The demo will be available once deployed.

## 📖 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)

## ✨ Features

- 🎯 **Personalized Experience**: Enter your name to get personalized motivational messages
- 🤖 **AI-Generated Questions**: Dynamic question generation using DeepSeek API
- 📊 **Progress Tracking**: Track your score and maintain study streaks
- 💪 **Motivational Feedback**: Encouraging messages that use your name
- ⚙️ **Settings Management**: Update your name and API key in the settings panel
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui and Tailwind CSS
- 🔒 **Privacy Focused**: Your data stays local, no unnecessary tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vikashsparxit/crisc-brain-trainer.git

# Navigate to the project directory
cd crisc-brain-trainer

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager
- DeepSeek API key (for AI question generation)

### Setup Steps

1. **Clone the repository** (as shown in Quick Start above)
2. **Install dependencies** using your preferred package manager
3. **Configure API Key**: Add your DeepSeek API key in the settings panel
4. **Start development server** and begin practicing!

## 💻 Usage

1. **Personalization**: Enter your name in the settings to get personalized motivational messages
2. **API Configuration**: Add your DeepSeek API key in the settings panel
3. **Practice Exams**: Generate AI-powered questions and track your progress
4. **Progress Tracking**: Monitor your scores and maintain study streaks

## 🔧 Development

There are several ways to contribute to this project:

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Tech Stack

This project is built with modern web technologies:

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **shadcn/ui** with Radix UI primitives for beautiful components
- **Tailwind CSS** for utility-first styling

### State Management & Data
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation for forms
- **React Router DOM** for client-side routing

### UI/UX
- **Recharts** for data visualization
- **Lucide React** for beautiful icons
- **Sonner** for toast notifications
- **Next Themes** for dark/light mode support

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type checking
- **PostCSS** for CSS processing

## 🗺️ Roadmap

### Upcoming Features
- [ ] **Offline Mode**: Practice without internet connection
- [ ] **Question Categories**: Organize questions by CRISC domains
- [ ] **Study Analytics**: Detailed progress reports and insights
- [ ] **Social Features**: Share progress with study groups
- [ ] **Mobile App**: Native mobile application
- [ ] **Dark Mode**: Complete dark theme support
- [ ] **Export Progress**: Download your study data
- [ ] **Custom Questions**: Add your own questions to the database

### Completed Features ✅
- [x] Personalized user experience
- [x] AI-generated questions
- [x] Progress tracking
- [x] Modern UI with shadcn/ui
- [x] Responsive design
- [x] Settings management

## 🚀 Deployment

You can deploy this project using various platforms like Netlify, Vercel, or GitHub Pages.

## 🆘 Support

### Getting Help
- 📖 **Documentation**: Check this README for setup instructions
- 🐛 **Report Issues**: Use the [Issues](https://github.com/vikashsparxit/crisc-brain-trainer/issues) page
- 💬 **Discussions**: Start a discussion for questions and ideas
- 📧 **Contact**: Reach out to the maintainers

### Common Issues
- **API Key Issues**: Make sure your DeepSeek API key is valid and has sufficient credits
- **Build Errors**: Ensure you're using Node.js 18+ and have all dependencies installed
- **Performance**: The app works best with a stable internet connection for AI features

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=vikashsparxit/crisc-brain-trainer&type=Date)](https://star-history.com/#vikashsparxit/crisc-brain-trainer&Date)

---

<div align="center">
Made with ❤️ for the CRISC community
</div>
