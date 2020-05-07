export const enableScroll = () => {
    document.documentElement.style.overflow = "scroll"
    document.body.scroll = "yes"
}

export const disableScroll = () => {
    document.documentElement.style.overflow = "hidden"
    document.body.scroll = "no"
}
