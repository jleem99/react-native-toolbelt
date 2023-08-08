#!/bin/bash
set -e
# exec 2>/dev/null

function renameAsset {
	echo "$1" |
	sed -E 's/drawable-([^\/]+)\/(.*)\.(.*)/\2@\1\.\3/' |
	sed 's/@mdpi//' |
	sed 's/@hdpi/@1.5x/' |
	sed 's/@xhdpi/@2x/' |
	sed 's/@xxhdpi/@3x/' |
	sed 's/@xxxhdpi/@3.5x/'
}

files="$(find -E assets -type f -regex 'assets/images/drawable-(m|h|xh|xxh|xxxh)dpi/.*')"

# IFS='\n'
echo "$files" | while read -r line; do
	mv "$line" "$(renameAsset "$line")"
done
