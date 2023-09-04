import { useRef, useState } from 'react'
import useUpdateEffect from './useUpdateEffect'

export interface UseListMethods<T> {
	push(item: T): void
	unshift(item: T): void
	update(item: T, updater: (item: T) => T): void
	update(predicate: (item: T) => boolean, updater: (item: T) => T): void
	remove(item: T): void
	remove(predicate: (item: T) => boolean): void
	removeAll(): void
}

export type UseListConfig<T> = {
	onRemove?: (item: T) => any
	onChange?: (list: T[]) => any
}

export type UseList<T> = [T[], UseListMethods<T>]

export default function useList<T>(
	initialValue: T[] = [],
	{ onRemove, onChange }: UseListConfig<T> = {},
): UseList<T> {
	const [list, setList] = useState<T[]>(initialValue)
	const refs = useRef({ list, onRemove }).current
	refs.list = list
	refs.onRemove = onRemove

	useUpdateEffect(() => {
		onChange?.(list)
	}, [list])

	const useListMethods = useRef<UseListMethods<T>>({
		push(item: T, allowDuplicate = false) {
			if (allowDuplicate) setList((prev) => [...prev, item])
			else setList((prev) => [...new Set([...prev, item])])
		},

		unshift(item: T, allowDuplicate = false) {
			if (allowDuplicate) setList((prev) => [item, ...prev])
			else setList((prev) => [...new Set([item, ...prev])])
		},

		update(predicateOrItem, updater) {
			const predicate =
				predicateOrItem instanceof Function
					? predicateOrItem
					: (e: T) => e === predicateOrItem
			setList((prev) =>
				prev.map((item) => (predicate(item) ? updater(item) : item)),
			)
		},

		remove(predicateOrItem) {
			if (predicateOrItem instanceof Function) {
				const item = list.find(predicateOrItem)
				if (!item) return
				refs.onRemove?.(item)
				setList((prev) => prev.filter((e) => e !== item))
			} else {
				refs.onRemove?.(predicateOrItem)
				setList((prev) => prev.filter((e) => e !== predicateOrItem))
			}
		},

		removeAll() {
			setList([])
		},
	})

	return [list, useListMethods.current]
}
