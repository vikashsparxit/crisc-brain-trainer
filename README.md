# CRISC Mock Exam Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A personalized learning tool for ISACA CRISC certification preparation with AI-generated questions and motivational feedback.

## 📖 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)

## Features

- **Personalized Experience**: Enter your name to get personalized motivational messages
- **AI-Generated Questions**: Dynamic question generation using DeepSeek API
- **Progress Tracking**: Track your score and maintain streaks
- **Motivational Feedback**: Encouraging messages that use your name
- **Settings Management**: Update your name and API key in the settings panel

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager

## 📦 Installation

Follow these steps to get the project running locally:

```bash
# Step 1: Clone the repository
git clone https://github.com/yourusername/crisc-mock-exam-tool.git

# Step 2: Navigate to the project directory
cd crisc-mock-exam-tool

# Step 3: Install the necessary dependencies
npm install
# or if using bun
bun install

# Step 4: Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

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

## 🛠️ Technologies Used

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## How can I deploy this project?

You can deploy this project using various platforms like Netlify, Vercel, or GitHub Pages.

## I want to use a custom domain - is that possible?

Yes, you can use a custom domain with most deployment platforms. For example, with Netlify you can configure custom domains in your site settings.
