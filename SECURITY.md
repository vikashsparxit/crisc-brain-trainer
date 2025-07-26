# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** create a public GitHub issue
Security vulnerabilities should be reported privately to prevent potential exploitation.

### 2. Email the security team
Send an email to the maintainers with the following information:
- **Subject**: `[SECURITY] Vulnerability Report`
- **Description**: Detailed description of the vulnerability
- **Steps to reproduce**: Clear steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Suggested fix**: If you have a suggested fix (optional)

### 3. What happens next?
- You'll receive an acknowledgment within 48 hours
- We'll investigate the report and keep you updated
- Once confirmed, we'll work on a fix
- We'll coordinate the disclosure and release

### 4. Responsible Disclosure
We follow responsible disclosure practices:
- We'll credit you in the security advisory (unless you prefer to remain anonymous)
- We'll work with you to ensure the fix is adequate
- We'll coordinate the public disclosure

## Security Best Practices

### For Contributors
- Never commit API keys or sensitive data
- Use environment variables for configuration
- Follow secure coding practices
- Review code for potential security issues

### For Users
- Keep your API keys secure and private
- Use HTTPS when accessing the application
- Regularly update your dependencies
- Report any suspicious activity

## Security Features

This application implements several security measures:
- **Input Validation**: All user inputs are validated using Zod schemas
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Implemented where applicable
- **Secure Headers**: Proper security headers configuration
- **API Key Security**: Secure handling of API keys

## Updates and Patches

Security updates will be released as:
- **Critical**: Immediate patch release
- **High**: Within 1 week
- **Medium**: Within 1 month
- **Low**: Next regular release

## Contact

For security-related issues, please contact the maintainers directly rather than creating public issues.