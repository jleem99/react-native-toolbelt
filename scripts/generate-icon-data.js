const { promises: fs } = require('fs')
const path = require('path')
const prettier = require('prettier')
const prettierConfig = require('../.prettierrc.js')

const ASSET_ICON_PATH = './src/assets/icons'
const OUTFILE_PATH = './src/components/common/svg/SvgIcon/SvgIconMap.ts'

;(async function main() {
	await Promise.all([removeDSStore(), normalizeIconPaths()])
	await generateIconData()
})()

async function removeDSStore() {
	await fs.rm(path.join(ASSET_ICON_PATH, '.DS_Store'), { force: true })
	await fs.rm(path.join(ASSET_ICON_PATH, '.DS-Store'), { force: true })
}

async function normalizeIconPaths() {
	const icons = await fs.readdir(ASSET_ICON_PATH)
	for (const icon of icons) {
		const normalizedIconName = icon.replace(/_/g, '-')
		await fs.rename(
			path.join(ASSET_ICON_PATH, icon),
			path.join(ASSET_ICON_PATH, normalizedIconName),
		)
	}
}

async function generateIconData() {
	const imports = []
	const iconMapEntries = []

	const icons = (await fs.readdir(ASSET_ICON_PATH)).sort()
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

	const formatted = prettier.format(file, {
		...prettierConfig,
		parser: 'typescript',
	})
	await fs.writeFile(OUTFILE_PATH, formatted)
}
