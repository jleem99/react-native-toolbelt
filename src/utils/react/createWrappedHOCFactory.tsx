import React from 'react'
import { getDisplayName } from './component'

export default function createWrappedHOCFactory<T>(
	WrappingComponent: React.ComponentType<T>,
	{ memoize = false, props }: { memoize?: boolean; props?: T } = {},
) {
	return function withWrappingComponent<P>(
		Component: React.ComponentType<P>,
		wrappingComponentProps: T | ((props: P) => T) = props ?? ({} as T),
	) {
		const HOC = (hocProps: P) => (
			<WrappingComponent
				{...(wrappingComponentProps instanceof Function
					? wrappingComponentProps(hocProps)
					: wrappingComponentProps)}
			>
				<Component {...(props as P & JSX.IntrinsicAttributes)} />
			</WrappingComponent>
		)

		const wrappingComponentName = getDisplayName(WrappingComponent)
		const wrappedComponentName = getDisplayName(Component)
		HOC.displayName = `with${wrappingComponentName}(${wrappedComponentName})`

		return memoize ? React.memo(HOC) : HOC
	}
}
