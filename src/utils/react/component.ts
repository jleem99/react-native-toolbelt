export const getDisplayName = (Component: React.ComponentType<any>) =>
	Component.displayName || Component.name || 'Unknown Component'

export const isReactComponent = (
	Component: object | undefined | null,
): Component is React.ComponentType<any> =>
	(!!Component && 'render' in Component) || typeof Component === 'function'
