'use strict';
const ipcRenderer = require('electron').ipcRenderer;
let currentColor = localStorage.getItem('color');

let colors = document.getElementsByName('colors');
for (let i = 0; i < colors.length; i++) {
  if (currentColor === colors[i].value) {
    colors[i].checked = true;
  }
  colors[i].addEventListener('change', function() {
    let color = this.value;
    ipcRenderer.send('settings_changed', color);
  });
}
