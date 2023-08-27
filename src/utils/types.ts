import { Dispatch, SetStateAction } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type Style = ViewStyle | TextStyle | ImageStyle

export type SetState<T> = Dispatch<SetStateAction<T>>
export type UseState<T> = [T, SetState<T>]

export type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type SubPartialInverse<T, K extends keyof T> = Pick<T, K> &
	Partial<Omit<T, K>>

export type CastProperty<T, From, To> = {
	[K in keyof T]: T[K] extends From ? To : CastProperty<T[K], From, To>
}
