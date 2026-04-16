export type DropFirst<T> = T extends [unknown, ...infer R] ? R : never

export type ApiServer<ApiFunctions> = {
	[K in keyof ApiFunctions]: ApiFunctions[K] extends (
		url: string,
		...args: infer R
	) => infer P
		? (...args: R) => P
		: never
}

// По другому никак (((
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any

export function createWrapperCommon<
	TApi extends Record<string, AnyFn>,
	K extends keyof TApi,
>(api: TApi, functionKey: K, url: string): ApiServer<TApi>[K] {
	return ((...args: DropFirst<Parameters<TApi[K]>>) =>
		(api[functionKey] as (...a: unknown[]) => unknown)(
			url,
			...args,
		)) as ApiServer<TApi>[K]
}
