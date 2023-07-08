const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

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

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      mainWindow.webContents.send('command-output', error.message);
    } else if (stderr) {
      mainWindow.webContents.send('command-output', stderr);
    } else {
      mainWindow.webContents.send('command-output', stdout);
    }
  });
}

exports.executeCommand = executeCommand;
