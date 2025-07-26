# Contributing to CRISC Mock Exam Tool

Thank you for your interest in contributing to the CRISC Mock Exam Tool! This document provides guidelines for contributing to this open source project.

## Code of Conduct

This project and its participants are expected to uphold a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the bug
- Include your browser and OS information
- Provide screenshots if applicable

### Suggesting Enhancements

- Use the GitHub issue tracker to suggest new features
- Describe the enhancement in detail
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crisc-mock-exam-tool.git
cd crisc-mock-exam-tool

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

### Code Style

- Follow the existing code style and formatting
- Use TypeScript for all new code
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic

### Testing

- Test your changes in different browsers
- Ensure the application works with and without API keys
- Test the responsive design on different screen sizes

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # CSS and styling files
```

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have any questions about contributing, please open an issue or reach out to the maintainers.