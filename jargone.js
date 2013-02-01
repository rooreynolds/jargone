/*
 * Jargone
 * 
 * Highlight jargon on the page. Jargon, begone.
 * Roo Reynolds | rooreynolds.com | @rooreynolds
 * 
 * [NB: jargone.js is built using build.sh. Expect changes here to be overwritten]
 */

javascript:(function () { 

    // From http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
    function findAndReplace(searchText, replacement, searchNode) {
        if (!searchText || typeof replacement === 'undefined') {
            // Throw error here if you want...
            return;
        }
        var regex = typeof searchText === 'string' ?
                    new RegExp(searchText, 'g') : searchText,
            childNodes = (searchNode || document.body).childNodes,
            cnLength = childNodes.length,
            excludes = 'html,head,style,title,link,meta,script,object,iframe';
        while (cnLength--) {
            var currentNode = childNodes[cnLength];
            if (currentNode.nodeType === 1 &&
                (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
                arguments.callee(searchText, replacement, currentNode);
            }
            if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
                continue;
            }
            var parent = currentNode.parentNode,
                frag = (function(){
                    var html = currentNode.data.replace(regex, replacement),
                        wrap = document.createElement('div'),
                        frag = document.createDocumentFragment();
                    wrap.innerHTML = html;
                    while (wrap.firstChild) {
                        frag.appendChild(wrap.firstChild);
                    }
                    return frag;
                })();
            parent.insertBefore(frag, currentNode);
            parent.removeChild(currentNode);
        }
    }

	// list of words to avoid based on https://www.gov.uk/designprinciples/styleguide#item_4_1_3
	var words = [
            'advanced',
            'advancing',
            'agenda',
            'collaborate',
            'collaborating',
            'combating',
            'commit',
            'counter',
            'deliver',
            'dialogue',
            'disincentivise',
            'drive forward',
            'drive out',
            'driven forward',
            'driven out',
            'driving forward',
            'driving out',
            'e.g.',
            'empower',
            'facilitate',
            'facilitating',
            'focus',
            'foster',
            'go forward',
            'going forward',
            'i.e.',
            'impact',
            'in order to',
            'incentivise',
            'initiate',
            'initiating',
            'key',
            'landed',
            'landing',
            'leverage',
            'leveraging',
            'liaise',
            'liaising',
            'mobilise',
            'one stop shop',
            'overarch',
            'pledge',
            'pledging',
            'progress',
            'promote',
            'promoting',
            'ring fence',
            'ring fencing',
            'ringfence',
            'robust',
            'slim down',
            'slimmed down',
            'slimming down',
            'streamline',
            'strengthened',
            'strengthening',
            'tackle',
            'tackling',
            'transform',
            'transforming',
            'utilise',
            'utilising',
            'webinar'
	];

	var p = document.getElementsByTagName('p'); 
	for (var j = 0; j < words.length; j++) { // for each word
        var word = '\\b' + words[j].replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
        if (word.slice(-1) != '.') {
            word = word + '\\b';
        }
        var regex = new RegExp('(' + word + ')', 'ig');
        findAndReplace( regex, '<span style="background-color: #FFFF88">$1<\/span>' );
	}
})();

