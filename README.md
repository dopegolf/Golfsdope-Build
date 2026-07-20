# [Project Name]

> [One-line description]

## Status
<!-- Current project status: Planning / In Development / Staging / Live -->


## Purpose
<!-- What this project does and why it exists -->


## Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Setup

### Prerequisites
- Node.js 22 LTS
- npm
- Git

### Installation
```bash
git clone [repo-url]
cd [project-name]
npm install
cp .env.example .env
# Fill in .env with real values
```

### Development
```bash
npm run dev        # Start development server
npm run lint       # Run linter
npm run test       # Run tests
npm run build      # Production build
```

## Project Structure
```
src/           Source code
tests/         Test files
docs/          Documentation
scripts/       Utility scripts
assets/        Governed brand/media assets
registry/      Capability and connector registries
skills/        Custom skill packages
```

## Governance
- All changes go through branches and pull requests
- See [CLAUDE.md](CLAUDE.md) for standards and prohibited actions
- See [docs/SECURITY.md](docs/SECURITY.md) for secrets policy
- See [docs/DECISIONS.md](docs/DECISIONS.md) for decision log

## Current Handoff
See [docs/HANDOFF.md](docs/HANDOFF.md) for session state

## Owner
Ronnie Anderson / Trinity Vantage Group
