export type TErrorForm<T> = {
	[K in keyof T]: string
}
