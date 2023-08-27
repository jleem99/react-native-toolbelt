import { useEffect } from 'react'
import { EventArg, useNavigation } from '@react-navigation/native'

export default function useBeforeRemoveEffect(
	effect: (e: BeforeRemoveEvent) => void,
	deps: React.DependencyList,
) {
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', effect)
		return unsubscribe
		// eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-assignment
	}, [navigation, ...deps])
}

export type BeforeRemoveEvent = EventArg<
	'beforeRemove',
	true,
	{
		action: Readonly<{
			type: string
			payload?: object | undefined
			source?: string | undefined
			target?: string | undefined
		}>
	}
>
