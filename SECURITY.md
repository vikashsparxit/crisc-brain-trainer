# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CRISC Mock Exam Tool seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to [INSERT SECURITY EMAIL].

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the vulnerability
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English.

## Policy

CRISC Mock Exam Tool follows the principle of [Responsible Disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure).

## Security Best Practices

When using this application:

1. **API Key Security**: Never commit API keys to version control. Use environment variables or secure configuration management.
2. **HTTPS**: Always use HTTPS in production environments.
3. **Input Validation**: The application includes input validation, but always validate data on both client and server sides.
4. **Regular Updates**: Keep dependencies updated to patch known vulnerabilities.
5. **Environment Variables**: Store sensitive configuration in environment variables, not in code.

## Dependencies

We regularly update our dependencies to patch security vulnerabilities. You can check for outdated packages using:

```bash
npm audit
# or
bun audit
```

## Security Features

- Input validation and sanitization
- XSS protection through React's built-in escaping
- CSRF protection through proper token handling
- Secure API key storage in browser localStorage (for development only)
- Content Security Policy headers (when deployed with proper configuration)