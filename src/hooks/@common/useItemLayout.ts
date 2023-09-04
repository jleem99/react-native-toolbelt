import { useCallback } from 'react'

export const useItemLayout = (itemHeight: number) => {
	return useCallback(
		(_: any, index: number) => ({
			length: itemHeight,
			offset: itemHeight * index,
			index,
		}),
		[itemHeight],
	)
}

export const useSectionItemLayout = ({
	sectionContentHeight,
	sectionHeaderHeight = 0,
	sectionFooterHeight = 0,
}: {
	sectionContentHeight: number
	sectionHeaderHeight?: number
	sectionFooterHeight?: number
}) => {
	const sectionHeight =
		sectionContentHeight + sectionHeaderHeight + sectionFooterHeight

	return useCallback(
		(_: any, index: number) => {
			const sectionIndex = Math.floor(index / 3)
			const startOffset = Math.max(sectionIndex, 0) * sectionHeight
			const itemIndex = index % 3

			switch (itemIndex) {
				case 0: // Header
					return {
						length: sectionHeaderHeight,
						offset: startOffset,
						index,
					}
				case 1: // Content
					return {
						length: sectionContentHeight,
						offset: startOffset + sectionHeaderHeight,
						index,
					}
				case 2: // Footer
					return {
						length: sectionFooterHeight,
						offset: startOffset + sectionHeight,
						index,
					}
				default:
					return { length: 0, offset: startOffset, index }
			}
		},
		[
			sectionContentHeight,
			sectionFooterHeight,
			sectionHeaderHeight,
			sectionHeight,
		],
	)
}
