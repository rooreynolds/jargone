/*
 * Jargone
 * 
 * Highlight jargon on the page. Jargon, begone.
 * 
 * Roo Reynolds | rooreynolds.com | @rooreynolds
 */

javascript:(function () { 

var kw = ['synergy', 'agenda', 'advancing', 'advanced', 'collaborate', 'collaborating', 'combating', 'commit', 'pledge', 'pledging', 'counter', 'deliver', 'dialogue', 'disincentivise', 'incentivise', 'empower', 'facilitate', 'facilitating', 'focus', 'foster', 'impact', 'initiate', 'initiating', 'key', 'landing', 'landed', 'leverage', 'leveraging', 'liaise', 'liaising', 'overarch', 'progress', 'promote', 'promoting', 'robust', 'slimming down', 'slim down', 'slimmed down', 'streamline', 'strengthening', 'strengthened', 'tackling', 'tackle', 'transforming', 'transform', 'utilise', 'utilising', 'drive forward', 'driving forward', 'driven forward', 'drive out', 'driving out', 'driven out', 'go forward', 'going forward', 'in order to', 'one stop shop', 'ring fencing', 'ring fence', 'ringfence', 'e.g.', 'i.e.'];

var p = document.getElementsByTagName('p');
for (var j = 0; j < kw.length; j++) {
    for (var i = 0; i < p.length; i++) {
        var para = p[i].innerHTML;
        var regex = new RegExp('(\\b' + kw[j] + '\\b)', 'ig');
        para = para.replace(regex, '<span style=\'background-color: #FFFF88\'>$1<\/span>');
        p[i].innerHTML = para;
    }
}

})();

