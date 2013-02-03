#!/bin/sh
#
# This script expects to find the following in the current directory:
#   jargone.js.pre  - the preamble of the resulting javascript file
#   jargone.js.post - the postamble of the resulting javascript file
#   jargonlist.txt  - a file containing jargon, one phrase per line
#
# It will output a file called jargone.js
# It can be run from this directory as ./build.sh

cat jargone.js.pre > jargone.js
NUMJARGON=`wc -l jargonlist.txt | awk '{print $1}'`
COUNTER=0
while read line; do
    COUNTER=`expr $COUNTER + 1`;
    if [ "$COUNTER" = "$NUMJARGON" ]; then
        echo "            [$line]" >> jargone.js
    else
        echo "            [$line]," >> jargone.js
    fi
done < jargonlist.txt
cat jargone.js.post >> jargone.js
