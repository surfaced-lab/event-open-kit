# Event Open Kit

Event Open Kit is a small, privacy-first starter kit for building credible community-event interfaces without publishing private operational data.

It contains three deliberately public layers:

- reusable event UI patterns and design tokens;
- a synthetic event schema and sample records;
- event-marketing and proposal templates with explicit placeholders.

The demo is static, dependency-free, and runnable from a local web server. It does not send email, create registrations, issue passes, call an API, or collect telemetry.

## Run locally

```bash
npm test
npm run serve
```

Open `http://localhost:4173` after starting the server. The validation command checks the public file allowlist, JSON validity, required privacy markers, and common credential patterns.

## Repository map

```text
index.html                         interactive public demo
styles.css                         design tokens and responsive layout
app.js                             copy and playbook tab interactions
data/schema.json                   synthetic event contract
data/events.synthetic.json         illustrative records only
templates/event-marketing-brief.md reusable promotion brief
templates/sponsor-proposal.md      reusable sponsor proposal skeleton
scripts/validate.mjs               dependency-free release gate
CHANGELOG.md                       first public release notes
```

## Public/private boundary

This repository is intentionally safe to fork, but it is not a dump of a production event platform.

Public here:

- generic components, tokens, and interaction patterns;
- synthetic records that contain no real attendee, organizer, sponsor, or venue information;
- proposal structures, measurement vocabulary, and editorial checklists;
- reproducible local validation.

Keep private in the production repositories:

- real attendance, registration, check-in, and QR-signing records;
- personal contact details and private sponsor negotiations;
- API keys, payment credentials, mailbox data, infrastructure configuration, and telemetry;
- proprietary ranking logic, customer research, and operating playbooks that are part of the business advantage.

## Contribution standard

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Small, focused changes with a clear issue and a passing `npm test` are preferred.

Security reports belong in [SECURITY.md](SECURITY.md), not in a public issue.

Code is MIT licensed. The synthetic content and templates are CC BY 4.0; see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).

## Status

Version `0.1.0` is a public learning kit. It is not a production event registration system and makes no claim about real-world event availability, attendance, sponsor performance, or revenue.
