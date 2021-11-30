

export const isObjectEmpty = (obj: object, key: string): boolean => {
    return Object.keys(obj).includes(key);
}