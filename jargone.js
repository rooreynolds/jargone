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
            ['actioned'],
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
            ['deploy'],
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
            ['faq', "Instead, improve the original communication piece so that questions are asked *in*frequently. See www.gov.uk/design-principles/style-guide#faqs"],
            ['focusing', "Unless in the photographic sense"],
            ['foster', "Unless it is children"],
            ['fostering', "Unless it is children"],
            ['go forward'],
            ['going forward', "Use 'in future'"],
            ['impact', "Don't use it as a verb"],
            ['in order to'],
            ['incentivise'],
            ['initiate'],
            ['initiating'],
            ['key', "Unless it unlocks something. A subject/thing isn't 'key' – it's probably 'important'"],
            ['land', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['landed', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['landing', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['learnings', "Try 'lessons'"],
            ['leverage', "Unless in the financial or mechanical sense"],
            ['leveraging', "Unless in the financial sense"],
            ['liaise'],
            ['liaising'],
            ['low hanging fruit'],
            ['mobilise'],
            ['moving forward'],
            ['moving toward'],
            ['one stop shop'],
            ['one-stop shop'],
            ['overarching'],
            ['pledged'],
            ['pledging'],
            ['pledge'],
            ['progress'],
            ['progressed'],
            ['promote', "Unless you are talking about an ad campaign or similar"],
            ['promoted', "Unless you are talking about an ad campaign or similar"],
            ['promoting', "Unless you are talking about an ad campaign or similar"],
            ['purchase', "Consider 'buy'"],
            ['reach out to', "Consider 'contact'"],
            ['reached out to', "Consider 'contacted'"],
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
            ['tackled', "Unless it is rugby, football, some other sport"],
            ['tackling', "Unless it is rugby, football, some other sport"],
            ['tackle', "Unless it is rugby, football, some other sport"],
            ['transforming', "What are you actually doing to change it?"],
            ['transformed', "What actualled happened to change it?"],
            ['transform', "What are you actually doing to change it?"],
            ['tasked'],
            ['utilise', "Use"],
            ['utilised', "Used"],
            ['utilising', "Using"],
            ['webinar'],
            ['iron resolution',"a metaphor which is technically “dead” (e.g., iron resolution) has in effect reverted to being an ordinary word and can generally be used without loss of vividness. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['toe the line',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['tow the line',"Some metaphors now current have been twisted out of their original meaning without those who use them even being aware of the fact. For example, 'toe the line' is sometimes written 'tow the line'. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ring the changes',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ringed the changes',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ringing the changes',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ride roughshod over',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ride roughshod',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['riding roughshod',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['stand shoulder to shoulder',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['standing shoulder to shoulder',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['stood shoulder to shoulder',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['play into the hands',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['played into the hands',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['axe to grind',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['grist to the mill',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['troubled waters',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['order of the day',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['swan song',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['hotbed',"… there is a huge dump of worn-out metaphors which have lost all evocative power and are merely used because they save people the trouble of inventing phrases for themselves … - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['render inoperative',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['rendered inoperative',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['give rise to',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['given rise to',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['gave rise to',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['play a leading part',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['played a leading part',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['make itself felt',"Verbal false limbs. These save the trouble of picking out appropriate verbs and nouns, and at the same time pad each sentence with extra syllables which give it an appearance of symmetry. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['by examination',"Why not 'by examining'?"],
            ['not un',"banal statements are given an appearance of profundity by means of the not un- formation. … One can cure oneself of the not un-formation by memorising this sentence: A not unblock dog was chasing a not unsmall rabbit across a not ungreen field. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['with respect to',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['having regard to',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['the fact that',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['by dint of',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['in the interests of',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['on the hypothesis that',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['greatly to be desired',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['development to be expected',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['expected in the near future',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['deserving serious consideration',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['deserves serious consideration',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['deserved serious consideration',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['brought to a satisfactory conclusion',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['epoch-making', "Adjectives like epoch-making … are used to dignify the sordid processes of international politics. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['epic', "Adjectives like .. epic … are used to dignify the sordid processes of international politics. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['triumphant', "Adjectives like .. triumphant … are used to dignify the sordid processes of international politics. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['unforgettable', "Adjectives like .. unforgettable … are used to dignify the sordid processes of international politics. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['deus ex machine', "Bad writers, and especially scientific, political and sociological writers, are nearly always haunted by the notion that Latin or Greek words are grander than Saxon ones. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['status quo', "Bad writers, and especially scientific, political and sociological writers, are nearly always haunted by the notion that Latin or Greek words are grander than Saxon ones. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['expedite', "Bad writers, and especially scientific, political and sociological writers, are nearly always haunted by the notion that Latin or Greek words are grander than Saxon ones. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['ameliorate', "Bad writers, and especially scientific, political and sociological writers, are nearly always haunted by the notion that Latin or Greek words are grander than Saxon ones. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['exhibit',"Words like … exhibit … are used to dress up simple statements and give an air of scientific impartiality to biased judgments. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['utilize',"Words like … utilize … are used to dress up simple statements and give an air of scientific impartiality to biased judgments. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['categorical',"Words like … categorical … are used to dress up simple statements and give an air of scientific impartiality to biased judgments. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['bestial atrocities',"When one watches some tired hack on the platform mechanically repeating the familiar phrases … one often has a curious feeling that one is not watching a live human being but some kind of dummy… - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['iron heel',"When one watches some tired hack on the platform mechanically repeating the familiar phrases … one often has a curious feeling that one is not watching a live human being but some kind of dummy… - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['bloodstained tyranny',"When one watches some tired hack on the platform mechanically repeating the familiar phrases … one often has a curious feeling that one is not watching a live human being but some kind of dummy… - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['free peoples of the world',"When one watches some tired hack on the platform mechanically repeating the familiar phrases … one often has a curious feeling that one is not watching a live human being but some kind of dummy… - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['shoulder to shoulder',"When one watches some tired hack on the platform mechanically repeating the familiar phrases … one often has a curious feeling that one is not watching a live human being but some kind of dummy… - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['do well to bear in mind',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['leaves much to be desired',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['leave much to be desired',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['serve no good purpose',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['lay the foundations',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['radical transformation',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['explore every avenue',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['leave no stone unturned',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['leaving no stone unturned',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['left no stone unturned',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['leaving no stone unturned',"George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['jackboot',"from time to time one can even, if one jeers loudly enough, send some worn-out and useless phrase … into the dustbin where it belongs. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['melting pot',"from time to time one can even, if one jeers loudly enough, send some worn-out and useless phrase … into the dustbin where it belongs. - George Orwell, Politics and the English Language, Horizon, April 1946"],
            ['acid test',"from time to time one can even, if one jeers loudly enough, send some worn-out and useless phrase … into the dustbin where it belongs. - George Orwell, Politics and the English Language, Horizon, April 1946"]
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

	var popup = {
		add : function (element, notes, idx) {
			var popup;

			popup = document.createElement("div");
			popup.id = "jargonepopup-" + (idx + 1);
			popup.className = "jargonepopup";
			document.body.appendChild(popup);
			popup.innerHTML = notes;
			popup.style.left = element.getBoundingClientRect().left + 'px';
			popup.style.top = element.getBoundingClientRect().top + 20 + 'px';
			popup.style.visibility = 'visible';
			element.setAttribute('aria-describedby', popup.id);
			this.current.idx = (idx + 1);
			this.current.element = element;
		},
		remove : function () {
			var popup = document.getElementById("jargonepopup-" + this.current.idx);

			if (popup) {
				document.body.removeChild(popup);
				this.current.element.removeAttribute('aria-describedby');
				this.current.idx = null;
				this.current.element = null;
			}
		},
		current : {
			idx : null,
			element : null
		}
	};

	var popupEvt = (function () {
		var openIdx = null,
			focusedWord = null;

		return (function (e) {
			var element = e.target,
				term;

			if (!element.className || !element.className.match(/jargonehighlight/)) { return; }

			if ((openIdx !== null) || (e.type === 'focusout')) {
				popup.remove();
				focusedElement = null;
			} else {
				term = element.firstChild.nodeValue.toLowerCase();
				for (idx = 0; idx < wordsLen; idx++) {
						if (term.match(new RegExp(words[idx][0])) && words[idx][1]) {
						// clicks give focus so use it for capturing both events
						// focus is retained by elements when scrolling clears their popup so use clicks as backup
						if (e.type === 'click') {
							if ((focusedWord === element) && (popup.current.element === null)) {
								popup.add(element, words[idx][1], idx);
							}
						} else { // focusin
							focusedWord = element;
							popup.add(element, words[idx][1], idx);
						}
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
		words[idx][0] = words[idx][0].replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
		var pattern = '\\b' + words[idx][0];
		if (pattern.slice(-6) == '\\.\\.\\.') { // don't include end word boundary check if word ended with '...'
			pattern = pattern.slice(0, -6);
		    words[idx][0] = words[idx][0].slice(0, -6);
		} else {
        	if (pattern.slice(-1) != '.') {
            	pattern = pattern + '\\b';
        	}
        }
        var regex = new RegExp('(' + pattern + ')', 'ig');
    
		if (words[idx].length > 0 && words[idx][1] != undefined) {
          findAndReplace( regex, '<span class="jargonehighlight jargonehasnotes" tabindex="0">$1<\/span>');
        } else { // only use jargonehasnotes class if the entry has associated notes
          findAndReplace( regex, '<span class="jargonehighlight" tabindex="0">$1<\/span>');
        }
	}
	addEvent(document, 'focusin', popupEvt);
	addEvent(document, 'focusout', popupEvt);
	addEvent(document, 'click', popupEvt);
	addEvent(document, 'scroll', function () { popup.remove(); });
})();
