export function buildRecognition(input) {
  const clean = (value, limit) => String(value ?? '').replace(/[\u0000-\u001f\u200b-\u200d\ufeff\u2060]/g, ' ').trim().slice(0, limit);
  const event = clean(input.event, 100);
  const sponsor = clean(input.sponsor, 100);
  const contribution = clean(input.contribution, 240);
  if (!event || !sponsor || !contribution) throw new Error('Complete the event, supporter, and contribution fields.');
  const message = `Thank you, ${sponsor}, for supporting ${event}. Your contribution of ${contribution} is appreciated.`;
  const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>Thank you</title><style>body{font:20px/1.6 system-ui;color:#19222b;background:#fafaf8;margin:0;padding:8vw}main{max-width:800px;margin:auto;border-top:8px solid #2459a6;padding:40px 0;overflow-wrap:anywhere}h1{font-size:clamp(32px,6vw,64px);line-height:1.15}small{color:#485461}@media print{body{padding:18mm}}</style><main><p>${escape(event)}</p><h1>Thank you,<br>${escape(sponsor)}.</h1><p>${escape(message)}</p><small>Recognition prepared by the event team.</small></main></html>`;
  const markdown = `# Event recognition brief\n\nEvent: ${event}\n\nSupporter: ${sponsor}\n\nContribution: ${contribution}\n\n## Thank-you copy\n\n${message}\n\n## Before publishing\n\n- Confirm names, contribution wording, and permission to recognize publicly.\n- Review the exported file before sharing.\n- Add performance claims only when you have supporting evidence.\n`;
  return {event, sponsor, message, html, markdown};
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#recognitionForm');
  const status = document.querySelector('#recognitionStatus');
  let current;
  const refresh = () => {
    try {
      current = buildRecognition(Object.fromEntries(new FormData(form)));
      document.querySelector('#recognitionEvent').textContent = current.event;
      document.querySelector('#recognitionSponsor').textContent = current.sponsor;
      document.querySelector('#recognitionMessage').textContent = current.message;
      status.textContent = 'Preview ready. Review the wording before sharing.';
    } catch (error) { current = null; status.textContent = error.message; }
    document.querySelectorAll('[data-export]').forEach(button => button.disabled = !current);
  };
  form.addEventListener('input', refresh);
  form.addEventListener('submit', event => event.preventDefault());
  document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', () => {
    if (!current) return;
    const isHtml = button.dataset.export === 'html';
    const url = URL.createObjectURL(new Blob([isHtml ? current.html : current.markdown], {type: isHtml ? 'text/html;charset=utf-8' : 'text/markdown;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = isHtml ? 'thank-you-card.html' : 'event-recognition-brief.md';
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Download requested. Your exported file contains the text you entered.';
  }));
  refresh();
}
