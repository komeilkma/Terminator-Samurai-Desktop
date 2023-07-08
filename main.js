const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

function executeCommand(command) {
  let cmd;
  let args;

  if (os.platform() === 'win32') {
    cmd = 'cmd.exe';
    args = ['/c', command];
  } else {
    cmd = 'sh';
    args = ['-c', command];
  }

  const child = spawn(cmd, args);

  child.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = {
  executeCommand
};
