export default el => {
    if (!el) {
        return
    }

    const elHeight = el.getBoundingClientRect().height
    const elY = el.getBoundingClientRect().y

    if (elHeight + elY < 0) {
        return false
    }

    return true
}
