import { Context, useContext } from 'react'

export function createUseNonNullContext<T>(context: Context<T | null>) {
	return function useNonNullContext(): T {
		const contextValue = useContext(context)
		if (contextValue === null) throw new Error('Context not found.')
		return contextValue
	}
}
