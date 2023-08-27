import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export const useGoBack = () => useNavigation().goBack

export const usePopToTop = () => {
	const navigation = useNavigation<StackNavigationProp<any>>()
	return useCallback(() => {
		if (navigation.getState().routes.length > 1) navigation.popToTop()
	}, [navigation])
}
