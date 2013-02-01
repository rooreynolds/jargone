/*
 * Jargone
 * 
 * Highlight jargon on the page. Jargon, begone.
 * 
 * Roo Reynolds | rooreynolds.com | @rooreynolds
 */

javascript:(function () { 

	// list of words to avoid based on https://www.gov.uk/designprinciples/styleguide#item_4_1_3
	var words = [ //TODO: lift from a plain text file?
		'agenda', 
		'advancing', 
		'advanced', 
		'collaborate', 
		'collaborating', 
		'combating', 
		'commit', 
		'pledge', 
		'pledging', 
		'counter', 
		'deliver', 
		'dialogue', 
		'disincentivise', 
		'incentivise', 
		'empower', 
		'facilitate', 
		'facilitating', 
		'focus', 
		'foster', 
		'impact', 
		'initiate', 
		'initiating', 
		'key', 
		'landing', 
		'landed', 
		'liaise', 
		'liaising', 
		'overarch', 
		'progress', 
		'promote', 
		'promoting', 
		'robust', 
		'slimming down', 
		'slim down', 
		'slimmed down', 
		'streamline', 
		'strengthening', 
		'strengthened', 
		'tackling', 
		'tackle', 
		'transforming', 
		'transform', 
		'utilise', 
		'utilising', 
		'drive forward', 
		'driving forward', 
		'driven forward', 
		'drive out', 
		'driving out', 
		'driven out', 
		'go forward', 
		'going forward', 
		'in order to', 
		'one stop shop', 
		'ring fencing', 
		'ring fence', 
		'ringfence', 
		'e.g.', 
		'i.e.',
		'leverage', 
		'leveraging', 
		'synergy',
		'webinar',
		'mobilise'
	];

	var p = document.getElementsByTagName('p'); 
	for (var j = 0; j < words.length; j++) { // for each word
	    for (var i = 0; i < p.length; i++) {
	        var para = p[i].innerHTML;
	        var regex = new RegExp('(\\b' + words[j] + '\\b)', 'ig');
	        para = para.replace(regex, '<span style=\'background-color: #FFFF88\'>$1<\/span>'); // TODO: replace this dirty hack with something a bit nicer
	        p[i].innerHTML = para;
	    }
	}
})();

