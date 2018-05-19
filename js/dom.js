function DomUtils() {

    function getSubsequent(node, direction) {
        do {
            node = node[`${direction}Sibling`];
        } while(node.nodeType == Node.TEXT_NODE);
        return node;
    }

    /**
     * Get the dimensions of a given dom node.
     * 
     * @param {DomNode} node 
     * @param {string} dimension 
     * @param {boolean} margins 
     * @param {string} margin1 
     * @param {string} margin2 
     */
    function getDimension(node, dimension, margins, margin1, margin2) {
        let style = window.getComputedStyle(node);
        if(style[dimension] === 'auto' && style['display']=='none') {
            let parent = node.parentNode;
            let sibling = node.nextSibling;
            let position = node.style.position;
            document.body.appendChild(node);
            node.style.display = 'block';
            node.style.position = 'absolute';
            let measured = getDimension(node, dimension, margins, margin1, margin2);
            node.style.display = 'none';
            node.style.position = position;
            if(parent) {
                parent.insertBefore(node, sibling);
            }
            return measured;
        }
        return parseInt(style[dimension]) + (margins ? parseInt(style[`margin-${margin1}`]) + parseInt(style[`margin-${margin2}`]) : 0);
    }

    this.nextSibling = function(node) {
        return getSubsequent(node, 'next')
    }

    this.previousSibling = function(node) {
        return getSubsequent(node, 'previous')
    }

    this.toggleClass = function(node, className) {
        if(node.classList.contains(className)) {
            node.classList.remove(className)
        } else {
            node.classList.add(className);
        }
    }

    this.outerHeight = function(node, margins) {
        return getDimension(node, 'height', margins, 'top', 'bottom')
    }

    this.outerWidth = function(node, margins) {
        return getDimension(node, 'width', margins, 'left', 'right')
    }
}
