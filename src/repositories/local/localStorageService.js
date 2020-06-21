export const getLocalToken = () => {
    return window.localStorage.getItem("Token")
}

export const setLocalToken = (token) => {
    window.localStorage.setItem("Token", String(token))
}

export const deleteAllLocalData = () => {
    window.localStorage.clear()
}