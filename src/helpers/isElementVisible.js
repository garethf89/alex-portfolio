export default (el, threshold) => {
    if (!el) {
        return
    }

    const rect = el.getBoundingClientRect()
    const vHeight = window.innerHeight || document.documentElement.clientHeight

    // Not on screen
    if (rect.bottom < 0 || rect.top > vHeight) {
        return false
    }

    // Visible by percentage

    if (threshold) {
        const scrollPos = window.scrollY
        const elTop = el.offsetTop
        const elHeight = rect.height

        let deduct = 0
        let percentage = 0

        if (elTop < scrollPos) {
            deduct += scrollPos - elTop
        }
        if (elTop + elHeight > scrollPos + elHeight) {
            deduct += elTop + elHeight - (scrollPos + elHeight)
        }
        if (deduct > elHeight) {
            deduct = elHeight
        }
        percentage = Math.round(((elHeight - deduct) / elHeight) * 100)
        return percentage >= threshold
    }

    // Visible at all

    const efp = (x, y) => {
        return document.elementFromPoint(x, y)
    }

    return (
        el.contains(efp(rect.left, rect.top)) ||
        el.contains(efp(rect.right, rect.top)) ||
        el.contains(efp(rect.right, rect.bottom)) ||
        el.contains(efp(rect.left, rect.bottom))
    )
}
