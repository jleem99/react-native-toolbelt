import React, { JSXElementConstructor, ReactElement } from 'react'

export type ElementLike = Parameters<typeof React.isValidElement>[0]
export type GetElementTypeFromConstructor<T> = T extends JSXElementConstructor<
	infer P
>
	? ReactElement<P, T>
	: never

export class ReactElementUtility {
	public childrenArray: ReturnType<typeof React.Children.toArray>

	constructor(private children: React.ReactNode | React.ReactNode[]) {
		this.childrenArray = React.Children.toArray(this.children)
	}

	public static isElementOfType<T extends JSXElementConstructor<any>>(
		element: ElementLike,
		type: T,
	): element is GetElementTypeFromConstructor<T> {
		return React.isValidElement(element) && element.type === type
	}

	public static isElementOfTypes<T extends JSXElementConstructor<any>>(
		element: ElementLike,
		types: T[],
	): element is GetElementTypeFromConstructor<T> {
		return (
			React.isValidElement(element) &&
			types.some((type) => element.type === type)
		)
	}

	/** isElementOfType curry된 버전 */
	public static createIsElementOfType<T extends JSXElementConstructor<any>>(
		type: T,
	) {
		return (
			element: ElementLike,
		): element is GetElementTypeFromConstructor<T> =>
			this.isElementOfType(element, type)
	}

	/** 업데이트 된 프로퍼티와 함께 `cloneElement`를 수행 */
	public static updateElement<P>(element: ReactElement<P>, props: Partial<P>) {
		return React.cloneElement(element, { ...element.props, ...props })
	}

	public findElementOfType<T extends JSXElementConstructor<any>>(type: T) {
		return this.childrenArray.find(
			ReactElementUtility.createIsElementOfType(type),
		)
	}
}
