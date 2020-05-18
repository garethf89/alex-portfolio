export const random = (upper, amount) => {
    const arr = []
    while (arr.length < amount) {
        let r = Math.round(Math.random() * upper) + 1
        if (arr.indexOf(r) === -1) arr.push(r)
    }
    return arr
}
