
var fzui = {};

window.addEventListener('load', () => fzui.dropdowns.init([document]));

function getDOMObject(description) {
  if(typeof description === 'string') {
    return document.querySelector(description);
  }
  return description  
}

if(typeof require === 'function') {
  module.exports = fzui;
}
