const sampleRecord = `{
  "id": "evt_synthetic_commons_night",
  "title": "Neighbourhood Commons Night",
  "status": "published",
  "recordType": "synthetic"
}`;

const copySchema = document.querySelector('#copySchema');
const copyStatus = document.querySelector('#copyStatus');

copySchema?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(sampleRecord);
    copyStatus.textContent = 'Copied to clipboard.';
  } catch {
    copyStatus.textContent = 'Copy unavailable; select the sample manually.';
  }
});

const playbooks = {
  brief: {
    label: 'EVENT MARKETING BRIEF',
    title: 'One public answer before the campaign.',
    body: 'Write the public sentence, attach the source, name the next step, and define what would make the claim too stale to repeat.',
    fields: ['canonical URL', 'verified date', 'stop condition']
  },
  sponsor: {
    label: 'SPONSOR PROPOSAL SKELETON',
    title: 'Make the deliverable more concrete than the promise.',
    body: 'Describe the public placement, participant utility, recognition artifact, and evidence owner before discussing private commercial terms.',
    fields: ['public outcome', 'evidence owner', 'rights check']
  },
  contribution: {
    label: 'CONTRIBUTION PATH',
    title: 'Give a contributor one safe improvement to ship.',
    body: 'A clear issue, a small branch, a visible test, and a focused pull request are enough to turn interest into a trustworthy first contribution.',
    fields: ['one issue', 'npm test', 'small PR']
  }
};

const preview = document.querySelector('#playbookPreview');
const tabs = document.querySelectorAll('[data-playbook]');

function renderPlaybook(key) {
  const item = playbooks[key];
  if (!item || !preview) return;
  preview.innerHTML = `
    <p class="preview-label">${item.label}</p>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <div class="preview-fields">${item.fields.map((field) => `<span>${field}</span>`).join('')}</div>
  `;
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.playbook === key));
}

tabs.forEach((tab) => tab.addEventListener('click', () => renderPlaybook(tab.dataset.playbook)));

