import React from 'react'
import { getDisplayName } from './component'

export function createWrappedHOCFactory<T>(
	WrappingComponent: React.ComponentType<T>,
	memoize = false,
) {
	return function withWrappingComponent<P>(
		Component: React.ComponentType<P>,
		wrappingComponentProps: T | ((props: P) => T) = {} as T,
	) {
		const HOC = (props: P) => (
			<WrappingComponent
				{...(wrappingComponentProps instanceof Function
					? wrappingComponentProps(props)
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
