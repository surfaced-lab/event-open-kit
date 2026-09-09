import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const templates = {
  sponsor: '<main class="card"><p>Neighbourhood Commons Night</p><h1>Thank you,<br>Sample Community Collective.</h1><p>Your workshop materials and volunteer time helped bring this community event to life.</p><p>With appreciation, the event team</p></main>',
  volunteer: '<main class="card"><p>Certificate of appreciation</p><h1>Thank you,<br>Sample Volunteer.</h1><p>For contributing your time to Neighbourhood Commons Night.</p><p>Presented by the sample event team</p></main>'
};
const styles = 'body{font-family:Arial,sans-serif;color:#17222e;background:#fafaf8}.card{max-width:800px;margin:40px auto;padding:48px;border-top:8px solid #2459a6;overflow-wrap:anywhere}h1{font-size:48px;line-height:1.2}p{font-size:20px;line-height:1.6}@media print{.card{margin:0;max-width:none}}';
const editor = grapesjs.init({
  container: '#editor', height: '700px', storageManager: false, telemetry: false,
  assetManager: {upload: false, assets: []},
  parser: {optionsHtml: {allowScripts: false, allowUnsafeAttr: false}},
  components: templates.sponsor, style: styles,
  blockManager: {blocks: [
    {id:'thanks',label:'Recognition heading',content:'<h1>Thank you, Sample Supporter.</h1>'},
    {id:'contribution',label:'Contribution note',content:'<p>Thank you for contributing your time and materials.</p>'},
    {id:'signature',label:'Event signature',content:'<p>With appreciation, the sample event team</p>'}
  ]}
});
const status = document.querySelector('#status');
editor.on('load', () => { status.textContent = 'Ready. Double-click text in the canvas to edit; use the side panel to style it.'; });
document.querySelector('#apply').onclick = () => {
  if (!confirm('Replace the current design with this template? Download your edits first.')) return;
  editor.setComponents(templates[document.querySelector('#preset').value]); editor.setStyle(styles);
  status.textContent = 'Template loaded.';
};
document.querySelector('#undo').onclick = () => editor.UndoManager.undo();
document.querySelector('#redo').onclick = () => editor.UndoManager.redo();
function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = `Download requested: ${name}. Review before sharing.`;
}
document.querySelector('#export').onclick = () => download(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><title>Event recognition</title><style>${editor.getCss().replace(/<\/style/gi,'')}</style></head>${editor.getHtml()}</html>`, 'event-recognition.html', 'text/html');
document.querySelector('#project').onclick = () => download(JSON.stringify(editor.getProjectData(), null, 2), 'event-recognition.grapesjs.json', 'application/json');
