'use strict';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const shell = remote.shell;

let color = localStorage.getItem('color') ? localStorage.getItem('color') : 'skyblue';
setBackgroundColor(color);

let menu = new Menu();
menu.append(new MenuItem({label: 'Skyblue', click: function() {
  setBackgroundColor('skyblue');
}}));
menu.append(new MenuItem({label: 'Tomato', click: function() {
  setBackgroundColor('tomato');
}}));
menu.append(new MenuItem({label: 'Slategray', click: function() {
  setBackgroundColor('slategray');
}}));
window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
});
const quote = document.getElementById('quote');
const quotes = [
  'Just do it!',
  'Done is better than perfect',
  'Stay hungry, stay foolish',
  'Ask, do not tell',
  'Focus on the user',
  'Keep trying',
  'Nothing is impossible',
  'That which is measured, improves'
];
window.addEventListener('click', function() {
  quote.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
});

ipcRenderer.on('set_bgcolor', function(event, color) {
  setBackgroundColor(color);
});

function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem('color', color);
}

setTimeout(function () {
  let notification = new Notification(
    `Quote!`,
    { body: 'visit our website!' }
  );
  notification.onclick = function() {
    shell.openExternal('http://dotinstall.com');
  };
}, 3000);