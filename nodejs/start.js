const fs = require('fs');
const path = require('path');
(async () => {
  process.chdir('/tmp');
  const dir = '/tmp/bin';
  fs.mkdirSync(dir, { recursive: true });
  const curl = path.join(dir, 'curl');
  if (!fs.existsSync(curl)) {
    const res = await fetch('https://github.com/moparisthebest/static-curl/releases/download/v8.21.0/curl-amd64');
    if (!res.ok) throw new Error('static curl download failed: ' + res.status);
    fs.writeFileSync(curl, Buffer.from(await res.arrayBuffer()));
    fs.chmodSync(curl, 0o755);
  }
  process.env.PATH = dir + ':' + process.env.PATH;
  require('./index.js');
})().catch(e => { console.error(e); process.exit(1); });
