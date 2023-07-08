const { ipcRenderer } = require('electron');


document.getElementById('command-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const commandInput = document.getElementById('command-input');
  const command = commandInput.value.trim();

  if (command) {
    ipcRenderer.send('execute-command', command);
    commandInput.value = '';
  }
});

ipcRenderer.on('command-output', (event, output) => {
  const outputDiv = document.getElementById('command-output');
  outputDiv.textContent = output;
});
