export const isAuth = () => {
    const auth = window.localStorage.getItem("auth")

    if (auth) {
        return true
    } else {
        return false
    }
}

export const setAuth = () => {
    window.localStorage.setItem("auth", "true")
}
