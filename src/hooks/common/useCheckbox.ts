import { useMemo } from 'react'
import { map } from 'lodash'
import { useImmer } from 'use-immer'
import useUpdateEffect from './useUpdateEffect'

export interface Checkbox {
	state: boolean[]
	check(index: number): void
	radioCheck(index: number): void
	uncheck(index: number): void
	toggle(index: number): void
	checkAll(): void
	uncheckAll(): void
	setState(state: boolean[]): void
}

export default function useCheckbox(
	numItems: number,
	initialState = new Array<boolean>(numItems).fill(false),
): Checkbox {
	const [state, updateState] = useImmer(initialState)

	// 마운트 시 initialState가 덮어씌어지는 것을 방지하기 위해 useUpdateEffect를 사용
	useUpdateEffect(() => {
		updateState((prev) => {
			prev.length = numItems
			map(prev, Boolean) // Array.prototype.map은 empty element를 순회하지 않음
		})
	}, [numItems])

	const checkboxMethods = useMemo(
		() => ({
			check(index: number) {
				updateState((draft) => {
					draft[index] = true
				})
			},
			radioCheck(index: number) {
				updateState((draft) => {
					if (draft.some((b, i) => (i === index ? !b : b))) {
						const newState = new Array<boolean>(numItems).fill(false)
						newState[index] = true
						return newState
					}
					return draft
				})
			},
			uncheck(index: number) {
				updateState((draft) => {
					draft[index] = false
				})
			},
			toggle(index: number) {
				updateState((draft) => {
					draft[index] = !draft[index]
				})
			},
			checkAll() {
				updateState((draft) => {
					if (draft.some((b) => !b)) {
						return new Array<boolean>(numItems).fill(true)
					}
					return draft
				})
			},
			uncheckAll() {
				updateState((draft) => {
					if (draft.some((b) => b)) {
						return new Array<boolean>(numItems).fill(false)
					}
					return draft
				})
			},
			setState(newState: boolean[]) {
				updateState(newState)
			},
		}),
		[numItems, updateState],
	)

	return useMemo(
		() => ({ state, ...checkboxMethods }),
		[checkboxMethods, state],
	)
}
