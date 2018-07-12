fzui.notifications = new (function(){
  
  const decodeLocation = function(position) {

  }

  /**
   * Show a notification with content contained in description. Description could either be a DOM node or a CSS query 
   * string.
   * 
   * @param string|DOMNode description 
   */
  this.show = function(description) {
    let notification = getDOMObject(description);
    
    notification.style.left = (window.innerWidth - notification.offsetWidth - 50) + 'px';
    notification.style.visibility = 'visible';
    notification.style.opacity = 1;
    notification.style.top = '70px';

    setTimeout(() => {
      notification.style.opacity = 0;
      notification.style.top = '50px';
      setTimeout(() => notification.style.visibility = 'hidden', 1500);
    }, 5000)
  }
});
