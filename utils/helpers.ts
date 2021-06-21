export const length = <T>(value: string | Array<T>): number => value.length
export const head = <T>(value: string | Array<T>): string | T => value[0]
export const tail = <T>(value: string | Array<T>): Array<T> | string => value.slice(1)
export const push = <T>(list: Array<T>, value: T) => [...list, value]
export const pop = <T>(list: Array<T>) => [...list].slice(0, -1)
export const randomNumber = (n = 10) => Math.floor(Math.random() * n)
