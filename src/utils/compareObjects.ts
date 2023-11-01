export function isShallowEqualObject(object1: any, object2: any): boolean {
    if (typeof object1 !== "object" || typeof object2 !== "object") return false

    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false
        }
    }

    for (let key of keys2) {
        if (object1[key] !== object2[key]) {
            return false
        }
    }

    return true
}

export function hasAllKeys(object1: any, object2: any): boolean {
    if (typeof object1 !== "object" || typeof object2 !== "object") return false

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    return keys1.every(key => keys2.includes(key));
}