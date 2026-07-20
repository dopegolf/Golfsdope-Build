# Security

## Secrets Policy

- Secrets are NEVER committed to code, logs, chat, or artifacts
- Secrets are stored in: [TBD — password manager, .env files,
  GitHub Secrets, or cloud secret manager]
- .env files are listed in .gitignore and never committed
- .env.example contains variable NAMES only, never values
- All secret provisioning requires Ronnie's approval

## Approved Integrations

| Service | Purpose | Auth Method | Data Exposure | Approved |
|---------|---------|-------------|---------------|----------|
| (fill in as connectors are added) | | | | |

## Prohibited Data in Code/Repos

- API keys, tokens, passwords, or credentials
- Customer personal information (names, emails, addresses, payment)
- Financial records or transaction data
- Social security numbers, tax IDs, or government IDs
- Private health information
- Internal business strategies marked confidential

## Threat Model

### Assets to Protect
- Customer data (when applicable)
- Business credentials and API keys
- Brand assets and intellectual property
- Source code and proprietary logic
- Financial and operational records

### Threat Vectors
- Accidental secret exposure in commits or logs
- Unauthorized third-party tool access to business data
- Unreviewed automated deployments
- Social engineering via fake MCP servers or plugins
- Dependency supply-chain attacks

## Incident Response

1. Detect: identify the exposure or breach
2. Contain: revoke compromised credentials immediately
3. Assess: determine scope and impact
4. Notify: inform Ronnie immediately
5. Remediate: fix the root cause
6. Document: record in incident issue template
7. Prevent: implement controls to avoid recurrence

## Browser Security

- Dedicated browser profile for automated/CD work
- Never share session cookies across automation and personal use
- Log out of sensitive services when not in active use
