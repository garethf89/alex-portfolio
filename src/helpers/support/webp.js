let support
export const supportsWebP = () => {
    if (typeof support !== "undefined") return support

    if (typeof document === `undefined`) {
        // No browser
        return true
    }

    const elem =
        typeof document === "object" ? document.createElement("canvas") : false

    support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0

    return support
}
