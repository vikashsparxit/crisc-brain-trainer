# Contributing to CRISC Brain Trainer 🧠

Thank you for your interest in contributing to CRISC Brain Trainer! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are the main ways you can help:

### 🐛 Reporting Bugs
- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Provide detailed steps to reproduce
- Include screenshots if applicable
- Specify your environment (OS, browser, etc.)

### 💡 Suggesting Features
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem you're solving
- Describe your proposed solution
- Consider alternatives you've explored

### 🔧 Code Contributions
- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Make your changes
- Test thoroughly
- Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or bun
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/vikashsparxit/crisc-brain-trainer.git
cd crisc-brain-trainer

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Code Quality
We use several tools to maintain code quality:
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Prettier**: Code formatting

Run these commands before submitting:
```bash
npm run lint
npx tsc --noEmit
```

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code
- [ ] Added tests for new functionality
- [ ] Updated documentation
- [ ] No new warnings
- [ ] All tests pass

### PR Template
We provide a [pull request template](.github/pull_request_template.md) to help you include all necessary information.

## 🎨 Code Style

### TypeScript
- Use TypeScript for all new code
- Define proper types for all functions and variables
- Avoid `any` type when possible

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Keep README updated

### API Documentation
- Document new API endpoints
- Include request/response examples
- Update API documentation

## 🚀 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### Release Steps
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a release tag
4. Deploy to production

## 🏷️ Issue Labels

We use the following labels to organize issues:
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 📞 Getting Help

### Questions?
- Check existing issues and discussions
- Start a new discussion
- Reach out to maintainers

### Stuck?
- Ask for help in issues
- Join our community discussions
- Don't hesitate to ask questions

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Added to the contributors list

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to CRISC Brain Trainer! 🚀