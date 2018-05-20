
var fzui = {};

window.addEventListener('load', () => fzui.dropdowns.init([document]));

if(typeof require === 'function') {
  module.exports = fzui;
}