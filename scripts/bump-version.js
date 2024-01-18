const { exec } = require('child_process')
const fs = require('fs')
const prettier = require('prettier')

const RESET = '\x1b[0m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'

;(async function main() {
	const appConfig = await readJSON('app.json')

	const currentVerStr = appConfig.expo.version ?? '0.0.0'
	const [major, minor, patch] = currentVerStr.split('.').map((n) => +n)

	const currentVerCode = +(appConfig.expo.android.versionCode ?? '0')

	const bumpTypes = ['major', 'minor', 'patch']
	const bumpType = process.argv.find((arg) => bumpTypes.includes(arg))

	if (!bumpType) {
		// CLI 플래그가 전달되지 않았을 때 (npm 플래그와 '--'를 통해 구분되어야 함)
		console.log('Error:\tFlag has not been specified.')
		console.log('Usage:\tnpm run bump-version -- [major | minor | patch]')
		console.log('\tnpm run bump-version -- patch')
		process.exit(-1)
	}

	const versionStrMap = {
		major: `${major + 1}.0.0`,
		minor: `${major}.${minor + 1}.0`,
		patch: `${major}.${minor}.${patch + 1}`,
	}
	const versionStr = versionStrMap[bumpType]

	await bumpToVersion({
		appConfig,
		bumpType,
		versionStr,
		currentVerStr,
		currentVerCode,
	})
})()

/* ************************************************************************** */
/*                                  Utilities                                 */
/* ************************************************************************** */

async function bumpToVersion({ appConfig, bumpType, versionStr, currentVerStr, currentVerCode }) {
	const verCode = currentVerCode + 1

	console.log(`Bumping ${bumpType} version...\n`)
	console.log(`Current version: ${YELLOW}${currentVerStr}${RESET}`)
	console.log(`Current versionCode / buildNumber: ${YELLOW}${currentVerCode}${RESET}\n`)
	console.log(`Target version: ${CYAN}${versionStr}${RESET}`)
	console.log(`Target versionCode / buildNumber: ${CYAN}${verCode}${RESET}`)

	appConfig.expo.version = versionStr
	appConfig.expo.runtimeVersion = { policy: 'nativeVersion' }
	appConfig.expo.android.versionCode = verCode
	appConfig.expo.ios.buildNumber = verCode.toString()

	await writeJSON('app.json', appConfig)

	/** Invalidate EAS Build Cache */
	const easConfig = await readJSON('eas.json')
	easConfig.build.base.cache ??= { key: '' }
	easConfig.build.base.cache.key = versionStr
	await writeJSON('eas.json', easConfig)

	/** Commit Version Changes */
	commitVersion({ bumpType, versionStr })
}

function commitVersion({ bumpType, versionStr }) {
	const commands = [
		'git add {app,eas}.json',
		`git commit -m ${versionStr} -m "bump ${bumpType} version" --no-verify`,
		`git tag -f v${versionStr}`,
	]
	exec(`sh -c '${commands.join('&&')}'`)
}

async function readJSON(path) {
	return JSON.parse(fs.readFileSync(path))
}

async function writeJSON(path, object) {
	const formatted = await prettier.format(JSON.stringify(object), {
		parser: 'json',
		bracketSpacing: true,
		useTabs: false,
		tabWidth: 4,
		endOfLine: 'lf',
	})

	fs.writeFileSync(path, formatted)
}
