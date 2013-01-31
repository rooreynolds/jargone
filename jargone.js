/*
 * Jargone
 * 
 * Highlight jargon on the page. Jargon, begone.
 * 
 * Roo Reynolds | rooreynolds.com | @rooreynolds
 */

(function () { // via http://stackoverflow.com/a/6551184
        function getScript(url, success) {
            var script = document.createElement('script');
            script.type= 'text/javascript';
            script.src = url;

            var head = document.getElementsByTagName('head')[0];
            var completed = false;
            script.onload = script.onreadystatechange = function () {
                if (!completed && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    completed = true;
                    success();
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
            head.appendChild(script);
        }

        //getScript("http://localhost/jargone/jquery.js", function () {
        getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js", function () {
            //getScript("http://localhost/jargone/jquery.highlight.js", function () {
            getScript("https://raw.github.com/bartaz/sandbox.js/master/jquery.highlight.js", function () {
                $('p').highlight(['synergy', 'agenda', 'advancing', 'advanced', 'collaborate', 'collaborating', 'combating', 'commit', 'pledge', 'pledging', 'counter', 'deliver', 'dialogue', 'disincentivise', 'incentivise', 'empower', 'facilitate', 'facilitating', 'focus', 'foster', 'impact', 'initiate', 'initiating', 'key', 'landing', 'landed', 'leverage', 'leveraging', 'liaise', 'liaising', 'overarch', 'progress', 'promote', 'promoting', 'robust', 'slimming down', 'slim down', 'slimmed down', 'streamline', 'strengthening', 'strengthened', 'tackling', 'tackle', 'transforming', 'transform', 'utilise', 'utilising', 'drive forward', 'driving forward', 'driven forward', 'drive out', 'driving out', 'driven out', 'go forward', 'going forward', 'in order to', 'one stop shop', 'ring fencing', 'ring fence', 'ringfence', 'e.g.', 'i.e.']); //TODO: parse this list from a file so it can be updated easily
            });
        });
})();
