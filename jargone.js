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
            ['advanced'],
            ['advancing'],
            ['agenda', "Unless it's for a meeting"],
            ['being done', "Use the active voice. 'We are doing this'"],
            ['collaborate', "Use 'working with'"],
            ['collaborating'],
            ['combating'],
            ['commit'],
            ['counter'],
            ['deliver', "Pizzas, post and services are delivered – not abstract concepts like 'improvements' or 'priorities'"],
            ['dialogue', "We speak to people"],
            ['disincentivise'],
            ['drive forward'],
            ['drive out', "Unless it is cattle"],
            ['driven forward'],
            ['driven out'],
            ['driving forward'],
            ['driving out'],
            ['e.g.'],
            ['empower'],
            ['facilitate', "Instead, say something specific about how you are helping"],
            ['facilitating', "Instead, say something specific about how you are helping"],
            ['focus'],
            ['foster', "Unless it is children"],
            ['fostering', "Unless it is children"],
            ['go forward'],
            ['going forward'],
            ['i.e.'],
            ['impact', "Don't use it as a verb"],
            ['in order to'],
            ['incentivise'],
            ['initiate'],
            ['initiating'],
            ['key', "Unless it unlocks something. A subject/thing isn't 'key' – it's probably 'important'"],
            ['landed', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['landing', "Don't use 'land' as a verb unless you are talking about aircraft"],
            ['leverage', "Unless in the financial sense"],
            ['leveraging', "Unless in the financial sense"],
            ['liaise'],
            ['liaising'],
            ['mobilise'],
            ['one stop shop'],
            ['overarch'],
            ['pledge'],
            ['pledging'],
            ['progress'],
            ['promote', "Unless you are talking about an ad campaign or similar"],
            ['promoting'],
            ['ring fence'],
            ['ring fencing'],
            ['ringfence'],
            ['robust'],
            ['slim down'],
            ['slimmed down', "Weight-loss is slimming down. Everything else is probably removing x amount of paperwork etc"],
            ['slimming down', "Weight-loss is slimming down. Everything else is probably removing x amount of paperwork etc"],
            ['streamline'],
            ['strengthened', "Unless it is strengthening bridges or other structures"],
            ['strengthening', "Unless it is strengthening bridges or other structures"],
            ['synergy'],
            ['tackle', "Unless it is rugby, football, some other sport"],
            ['tackling', "Unless it is rugby, football, some other sport"],
            ['transform', "What are you actually doing to change it?"],
            ['transforming', "What are you actually doing to change it?"],
            ['utilise', "Use"],
            ['utilising', "Using"]
    ];

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
    css.innerHTML = ".jargonehighlight { background-color: #FFFF88; } .jargonehasnotes { border-bottom:1px dashed; } #jargonepopup { position: absolute; visibility: hidden; background-color: #FBFBFB; border: solid silver 1px; margin: 5px; padding: 6px;} ";
    document.getElementsByTagName("head")[0].appendChild(css);

    var popup = document.createElement("div");
    popup.id = "jargonepopup";
    popup.innerHTML = "hello";
    document.body.appendChild(popup);

    document.body.onmousedown = "alert('down');";

    var popupscript = document.createElement("script");
    popupscript.type = 'text/javascript';
    popupscript.text = "function popup(element, notes) { "
        + " if (notes && notes != 'undefined') { "
        + " notes = unescape(notes); "
        + " var popup = document.getElementById('jargonepopup'); "
        + " popup.innerHTML = notes; "
        + " popup.style.left = element.offsetLeft + 'px'; "
        + " popup.style.top = element.offsetTop + 12 + 'px' ; "
        + " popup.style.visibility='visible'; "
        + "}}";
    document.getElementsByTagName("head")[0].appendChild(popupscript);

    for (var i = 0; i < words.length; i++) { // for each word
        var word = '\\b' + words[i][0].replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
        if (word.slice(-1) != '.') {
            word = word + '\\b';
        }
        var regex = new RegExp('(' + word + ')', 'ig');
    
        if (words[i].length > 0 && words[i][1] != undefined) {
            findAndReplace( regex, '<span onmouseover="popup(this, \'' + escape(words[i][1]) + '\')" class="jargonehighlight jargonehasnotes">$1<\/span>'); // TODO: replace this dirty hack with something a bit nicer            
        } else {
            findAndReplace( regex, '<span onmouseover="popup(this)" class="jargonehighlight">$1<\/span>'); // TODO: replace this dirty hack with something a bit nicer
        }
        
    }
})();
