# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within CMPI Client, please send an email to [salahuddingfx](https://github.com/salahuddingfx). All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours of your report
- **Initial Assessment**: Within 1 week
- **Fix Deployment**: Depending on severity, within 1-4 weeks

## Security Best Practices

When using or contributing to this project:

- Never commit sensitive credentials (API keys, tokens) to the repository
- Use environment variables (`.env`) for all configuration secrets
- Keep dependencies up to date
- Validate all user input on both client and server side
- Use HTTPS in production
- Implement Content Security Policy (CSP) headers
- Sanitize any user-generated content before rendering (XSS prevention)
- Never store sensitive data in localStorage without encryption

## Dependency Security

We regularly audit our dependencies for known vulnerabilities. Run `npm audit` periodically to check for issues. If you discover a vulnerability in a dependency:

1. Report it to us immediately
2. Do not open a public issue
3. We will work to update or replace the affected dependency
