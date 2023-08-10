import { PropsWithChildren } from 'react'
import { omit } from 'lodash-es'
import shallowEqual from './shallowEqual'

export const propsAreEqualExcept = <P extends Record<string, any>>(
	exceptions: (keyof P)[],
) => {
	return function propsAreEqual(
		prevProps: Readonly<PropsWithChildren<P>>,
		nextProps: Readonly<PropsWithChildren<P>>,
	) {
		const prevRestProps = omit(prevProps, exceptions)
		const nextRestProps = omit(nextProps, exceptions)
		return shallowEqual(prevRestProps, nextRestProps)
	}
}

export const propsAreShallowEqual = <P extends Record<string, any>>(
	propsToShallowCheck: (keyof P)[],
) => {
	const restPropsAreEqual = propsAreEqualExcept<P>(propsToShallowCheck)

	return function propsAreEqual(
		prevProps: Readonly<PropsWithChildren<P>>,
		nextProps: Readonly<PropsWithChildren<P>>,
	) {
		return (
			propsToShallowCheck.every((propertyName) =>
				shallowEqual(prevProps[propertyName], nextProps[propertyName]),
			) && restPropsAreEqual(prevProps, nextProps)
		)
	}
}
