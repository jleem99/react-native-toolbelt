const fs = require('fs')
const path = require('path')

const ASSET_ICON_PATH = './assets/icons'
const OUTFILE_PATH = './src/components/common/atoms/svg/SvgIcon/SvgIconMap.ts'

removeDSStore()
normalizeIconPaths()
generateIconData()

function removeDSStore() {
	fs.rmSync(path.join(ASSET_ICON_PATH, '.DS_Store'), { force: true })
	fs.rmSync(path.join(ASSET_ICON_PATH, '.DS-Store'), { force: true })
}

function normalizeIconPaths() {
	const icons = fs.readdirSync(ASSET_ICON_PATH)
	for (const icon of icons) {
		const normalizedIconName = icon.replace(/_/g, '-')
		fs.renameSync(
			path.join(ASSET_ICON_PATH, icon),
			path.join(ASSET_ICON_PATH, normalizedIconName),
		)
	}
}

function generateIconData() {
	const imports = []
	const iconMapEntries = []

	const icons = fs.readdirSync(ASSET_ICON_PATH).sort()
	for (const icon of icons) {
		const iconName = path.parse(icon).name
		const componentName = iconName.replace(/-/g, '_').toUpperCase()
		const iconPath = path.join(ASSET_ICON_PATH, icon)
		const importString = `import ${componentName} from '${iconPath}'`
		imports.push(importString)

		const iconMapString = `\t'${iconName}': ${componentName},`
		iconMapEntries.push(iconMapString)
	}

	const file = `${imports.join('\n')}

const SvgIconMap = {
${iconMapEntries.join('\n')}
}

export type SvgIconName = keyof typeof SvgIconMap
export default SvgIconMap
`

	fs.writeFileSync(OUTFILE_PATH, file)
}
