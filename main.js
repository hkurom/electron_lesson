'use strict';

// index.js (main process)
// - GUI (rendeler)

const electron = require(`electron`);
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let mainWindow;
let settingsWindow;
let menuTemplate = [{
  label: 'MyApp',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click: function() {
      showAboutDialog();
    }},
    { type:  'separator' },
    { label: 'Setting', accelerator: 'CmdOrCtrl+,', click: function() {
      showSettingDialog();
    }},
    { type:  'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() {
      app.quit();
    }},
  ]
}];
let menu = Menu.buildFromTemplate(menuTemplate);
ipcMain.on('settings_changed', function(event, color) {
  mainWindow.webContents.send('set_bgcolor', color);
});

function createMainWindow() {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({
    width:800,
    height:600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools(); // chrome dev tools
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', function() {
  // create window
  createMainWindow();
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createMainWindow();
  }
});

function showAboutDialog() {
  dialog.showMessageBox( {
    title: 'About',
    type: 'info',
    buttons: ['OK'],
    message: 'About This App',
    detail: 'This app was created by hkurom'
  })
}

function showSettingDialog() {
  settingsWindow = new BrowserWindow({
    width:600,
    height:400,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  settingsWindow.loadURL('file://' + __dirname + '/settings.html');
  //settingsWindow.webContents.openDevTools();
  settingsWindow.show();
  settingsWindow.on('closed', function() {
    settingsWindow = null;
  });
}
