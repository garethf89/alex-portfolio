export default el => {
    if (!el) {
        return
    }
    const windowHeight = window.innerHeight
    if (el.getBoundingClientRect().y === 0) {
        return true
    }
    if (
        el.getBoundingClientRect().y > 0 &&
        el.getBoundingClientRect().y < windowHeight
    ) {
        return true
    }
    if (
        el.getBoundingClientRect().y < 0 &&
        el.getBoundingClientRect().y > -windowHeight
    ) {
        return true
    }
    return false
}
