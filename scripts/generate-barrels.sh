#!/bin/bash

MAXDEPTH=${MAXDEPTH:-1}
BARREL_NAME=index.ts
CWD="$(pwd)"

set -e
IFS=$'\n'

function generate_barrels {(
	cd "$1"

	### Remove Existing Barrel ###
	rm -f "$BARREL_NAME"

	### List Files ###
	FILES=($(
		find . -mindepth 1 -maxdepth $MAXDEPTH ! -name '.*' ! -path '*/__*__*' ! -name '*.test.*' ! -name '*.mock.*' |
		sed -E 's:^\./([^.]*)(\..*)?$:\1: ; s:/index$:: ; s:(/.+){2}:\1:' |
		sort -u
	))

	# 파일이 없을 시 리턴
	[ -z "$FILES" ] && return

	### Generate Exports ###
	echo "/* Auto-generated by scripts/generate-barrels.sh */" >> "$BARREL_NAME"
	echo >> "$BARREL_NAME"

	for file in "${FILES[@]}"; do
		# Default export 존재 여부 확인
		[ -n "$(cat $file.* $file/index.* 2>/dev/null | grep -E '^export (default|{ default })')" ] &&
			echo "export { default as ${file##*/} } from './$file'" >> "$BARREL_NAME"
	done

	echo >> "$BARREL_NAME"

	for file in "${FILES[@]}"; do
		# Named export 존재 여부 확인
		[ -n "$(cat $file.* $file/index.* 2>/dev/null | grep -E '^export' | grep -vE '^export (default|{ default })')" ] &&
			echo "export * from './$file'" >> "$BARREL_NAME"
	done
)}

for dir in $@; do
	generate_barrels "$dir" &
done

wait
