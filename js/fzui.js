
var fzui = {};
if($ === null && typeof require === 'function') {
    $ = require('jquery');
    module.exports = fzui;
}