# Contributing to CMPI Client

Thank you for considering contributing to CMPI Client! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

- Check existing issues to avoid duplicates
- Open a new issue with a clear title and description
- Include steps to reproduce the bug
- Include your environment details (OS, browser, Node version, etc.)

### Suggesting Features

- Open an issue describing the feature
- Explain why this feature would be useful
- Include example use cases if possible

### Pull Requests

1. Fork the repository
2. Create your feature branch from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes following the coding standards below
4. Commit your changes with a descriptive message:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/salahuddingfx/CMPI-Client.git
cd CMPI-Client
npm install
npm run dev
```

## Coding Standards

### TypeScript / React
- Use TypeScript for all components
- Use functional components with hooks
- Follow consistent naming: PascalCase for components, camelCase for functions/variables
- Keep components small and focused
- Use proper prop typing with interfaces

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## Security

Please do not report security vulnerabilities through public GitHub issues. See our [Security Policy](SECURITY.md) for details.

## License

By contributing, you agree that your contributions will be licensed under the [GNU General Public License v3.0](LICENSE).
