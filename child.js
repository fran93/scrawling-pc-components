const spawn = require('child_process').spawn;
const ls = spawn('./phantomjs', ['coolmod.js', 'Asus Z170 PRO GAMING']);
  
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
