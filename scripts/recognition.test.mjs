import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildRecognition} from '../recognition.js';
test('exports match the supplied event and supporter', () => {
  const result = buildRecognition({event:'Sample event', sponsor:'Sample supporter', contribution:'volunteer time'});
  assert.match(result.html, /Sample supporter/);
  assert.ok(result.markdown.includes(result.message));
});
test('HTML inputs stay inert in downloaded cards', () => {
  const result = buildRecognition({event:'<script>alert(1)</script>', sponsor:'<img src=x onerror=alert(1)>', contribution:'A & B'});
  assert.ok(!result.html.includes('<script>'));
  assert.ok(!result.html.includes('<img'));
  assert.ok(result.html.includes('A &amp; B'));
});
test('empty inputs rejected and exported text bounded', () => {
  assert.throws(() => buildRecognition({}), /Complete/);
  assert.equal(buildRecognition({event:'x'.repeat(200),sponsor:'test',contribution:'test'}).event.length, 100);
});
