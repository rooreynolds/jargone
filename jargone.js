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
            'synergy',
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

        for (var i = 0; i < p.length; i++) {
            var para = p[i].innerHTML;
            para = para.replace(regex, '<span style=\'background-color: #FFFF88\'>$1<\/span>'); // TODO: replace this dirty hack with something a bit nicer
            p[i].innerHTML = para;
        }
    }
})();

