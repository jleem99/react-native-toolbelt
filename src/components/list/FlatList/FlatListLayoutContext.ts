import { createContext, useContext } from 'react'
import { LayoutRectangle } from 'react-native'

export const FlatListLayoutContext = createContext<LayoutRectangle | null>(null)

export const useFlatListLayout = () => {
	const context = useContext(FlatListLayoutContext)
	if (context === null) {
		throw new Error(
			'useFlatListLayout must be used within a FlatListLayoutContext',
		)
	}
	return context
}
