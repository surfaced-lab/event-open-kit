# Event Open Kit

## Event recognition studio powered by GrapesJS

The visual editor is a vertical integration of [GrapesJS core](https://github.com/GrapesJS/grapesjs), not a new editing engine. Open `studio.html` after building. It reuses upstream canvas editing, styling, drag-and-drop, undo/redo and serialization. Our layer supplies fictional sponsor thank-you and volunteer-certificate presets plus HTML and editable-project downloads.

```bash
npm ci --ignore-scripts
npm run build
npm test
npm run serve
```

Visit http://localhost:4173/studio.html. Double-click canvas text to edit. Download HTML for browser printing or the project JSON for use with GrapesJS `loadProjectData`. In-app project import is not implemented. A desktop browser is recommended for the upstream editor.

GrapesJS 0.23.6 is pinned and BSD-3-Clause licensed; see [notices](THIRD-PARTY-NOTICES.md). We use its open-source core, not the separate commercial Studio SDK. Telemetry and storage are disabled, network connections blocked by the studio CSP, and assets bundled locally. Dependencies are fetched only during installation. No private HonorMaker system or data is connected.

Alternatives evaluated: [pdfme](https://github.com/pdfme/pdfme) (MIT, stronger for fixed PDF forms and certificates) and [Penpot](https://github.com/penpot/penpot) (MPL-2.0, a full design/collaboration application). GrapesJS fits editable event HTML with a smaller integration. This is a technical fit assessment; preserve license notices when distributing builds.

The original lightweight builder below remains dependency-free; the visual studio requires the build above. The dependency audit on 2026-09-09 reported zero known vulnerabilities; installation warned that upstream backbone-undo is deprecated. Track that dependency during upgrades.

Build an event sponsor thank-you kit in your browser: edit the event, supporter, and contribution, then download a printable HTML card and Markdown brief. No account, API key, or installation of dependencies required.

Maintained by surfaced-lab, the team behind HonorMaker. The editable digital templates are independent of HonorMaker's commercial product.

It contains three deliberately public layers:

- reusable event UI patterns and design tokens;
- a synthetic event schema and sample records;
- event-marketing and proposal templates with explicit placeholders.

The demo is static, dependency-free, and runnable from a local web server. It does not send email, create registrations, issue passes, call an API, or collect telemetry.

## Run locally

```bash
git clone https://github.com/surfaced-lab/event-open-kit.git
cd event-open-kit
npm test
node --test scripts/recognition.test.mjs
npm run serve
```

Requires Node.js 20+ and Python 3 for the local server. Open the **Build a thank-you kit** section, edit the fictional defaults, and download both files. To save a PDF, open the downloaded HTML and use your browser's print dialog.

Inputs are held only in page memory and included in your downloads. Review exported content before sharing; do not commit real supporter or customer records. This tool does not contact HonorMaker or send form data anywhere.

## Help shape the kit

If this saves you time, consider starring the repository. Useful first contributions: a bilingual recognition template, a print-layout improvement, or a keyboard-accessibility fix. Include a fictional example and explain which organizer task it improves.

See [the research and adoption plan](docs/open-source-patterns.md) for the source projects, selection limits, and next experiments. Stars measure interest; they do not establish organizer adoption.

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
