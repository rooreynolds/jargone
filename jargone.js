/*
 * Jargone
 * 
 * Highlight jargon on the page. Jargon, begone.
 * Roo Reynolds | rooreynolds.com | @rooreynolds
 * 
 * [NB: jargone.js is built using build.sh. Expect changes here to be overwritten]
 */

javascript:(function () { 

    // list of words to avoid based on https://www.gov.uk/designprinciples/styleguide#item_4_1_3
    var words = [
            ['advancing'],
            ['agenda', "Unless it's for a meeting"],
            ['approximately', "Consider 'about'"],
            ['assist', "Consider 'help'"],
            ['assisted', "Consider 'help'"],
            ['assisting', "Consider 'help'"],
            ['being done', "Use the active voice. 'We are doing this'"],
            ['collaborate', "Use 'working with'"],
            ['collaborated', "Use 'worked with'"],
            ['collaborating', "Use 'working with'"],
            ['combating'],
            ['commit'],
            ['committed'],
            ['committing'],
            ['countering'],
            ['deliver', "Pizzas, post and services are delivered – not abstract concepts like 'improvements' or 'priorities'"],
            ['dialogue', "We speak to people"],
            ['discourse', "Discussion"],
            ['disincentivise'],
            ['disincentivised'],
            ['disincentivising'],
            ['drive forward'],
            ['drive out', "Unless it is cattle"],
            ['driven forward'],
            ['driven out'],
            ['driving forward'],
            ['driving out'],
            ['empower'],
            ['facilitate', "Instead, say something specific about how you are helping"],
            ['facilitating', "Instead, say something specific about how you are helping"],
            ['focusing'],
            ['foster', "Unless it is children"],
            ['fostering', "Unless it is children"],
            ['go forward'],
            ['going forward'],
            ['impact', "Don't use it as a verb"],
            ['incentivise'],
            ['initiate'],
            ['initiating'],
            ['key', "Unless it unlocks something. A subject/thing isn't 'key' – it's probably 'important'"],
            ['land', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['landed', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['landing', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['leverage', "Unless in the financial sense"],
            ['leveraging', "Unless in the financial sense"],
            ['liaise'],
            ['liaising'],
            ['mobilise'],
            ['one stop shop'],
            ['overarching'],
            ['pledge'],
            ['pledged'],
            ['pledging'],
            ['progress'],
            ['progressed'],
            ['promote', "Unless you are talking about an ad campaign or similar"],
            ['promoted', "Unless you are talking about an ad campaign or similar"],
            ['promoting', "Unless you are talking about an ad campaign or similar"],
            ['purchase', "Consider 'buy'"],
            ['ring fence'],
            ['ring fenced'],
            ['ring fencing'],
            ['ringfence'],
            ['ringfenced'],
            ['robust'],
            ['slim down'],
            ['slimmed down', "Weight-loss is slimming down. Everything else is probably removing x amount of paperwork etc"],
            ['slimming down', "Weight-loss is slimming down. Everything else is probably removing x amount of paperwork etc"],
            ['streamline'],
            ['streamlined'],
            ['streamlining'],
            ['strengthened', "Unless it is strengthening bridges or other structures"],
            ['strengthening', "Unless it is strengthening bridges or other structures"],
            ['such as', "Consider 'like'"],
            ['synergy'],
            ['tackle', "Unless it is rugby, football, some other sport"],
            ['tackled', "Unless it is rugby, football, some other sport"],
            ['tackling', "Unless it is rugby, football, some other sport"],
            ['transform', "What are you actually doing to change it?"],
            ['transforming', "What are you actually doing to change it?"],
            ['transformed', "What actualled happened to change it?"],
            ['utilise', "Use"],
            ['utilised', "Used"],
            ['utilising', "Using"],
            ['webinar']
	],
	wordsLen = words.length,
	idx;

    function addEvent(elem, eventType, handler) {
        if (elem.addEventListener) {
            elem.addEventListener (eventType, handler, false);
        } else if (elem.attachEvent) {
            handler = function (e) {
                var target = (typeof e.target === 'undefined') ? e.srcElement : e.target;

                handler.call(target, { 'target' : target });
            };
            elem.attachEvent ('on' + eventType, handler);
        } else {
            return false;
        }
    };	

	var popupEvt = (function () {
		var openIdx = null;

		return (function (e) {
			var element = e.target,
				term,
				notes,
				popup,
				idx;

			if (!element.className || !element.className.match(/jargonehighlight/)) { return; }

			if ((openIdx !== null) || e.type.match(/(focusout)/)) {
				popup = document.getElementById('jargonepopup-' + openIdx);
				if (popup !== null) {
					document.body.removeChild(popup);
					openIdx = null;
					element.removeAttribute('aria-describedby');
				}
			} else {
				term = element.firstChild.nodeValue.toLowerCase();

				for (idx = 0; idx < wordsLen; idx++ ) {
					if (term.match(new RegExp(words[idx][0])) && words[idx][1]) {
						openIdx = idx + 1;
						notes = words[idx][1];
						popup = document.createElement("div");
						popup.id = "jargonepopup-" + openIdx;
						popup.className = "jargonepopup";
						document.body.appendChild(popup);
						popup.innerHTML = notes;
						popup.style.left = element.getBoundingClientRect().left + 'px';
						popup.style.top = element.getBoundingClientRect().top + 20 + 'px';
						popup.style.visibility = 'visible';
						element.setAttribute('aria-describedby', popup.id);
						break;
					}
				}
			}
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		});
	}());

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

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".jargonehighlight { background-color: #FFFF88 !important; color: black; } .jargonehasnotes { cursor: help; border-bottom:1px dashed !important; } .jargonepopup { position: fixed; z-index: 1000 !important; visibility: hidden; background-color: #FFFFCC; color: black; border: solid silver 1px; margin: 5px; padding: 6px;} ";
    document.getElementsByTagName("head")[0].appendChild(css);

	for (idx = 0; idx < wordsLen; idx++) { // for each word
		var pattern = '\\b' + words[idx][0].replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
        if (pattern.slice(-1) != '.') {
            pattern = pattern + '\\b';
        }
        var regex = new RegExp('(' + pattern + ')', 'ig');
    
		findAndReplace( regex, '<span class="jargonehighlight jargonehasnotes" tabindex="0">$1<\/span>');
	}
	addEvent(document, 'focusin', popupEvt);
	addEvent(document, 'focusout', popupEvt);
})();
