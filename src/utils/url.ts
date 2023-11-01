export function hasURLParams(): boolean {
    const searchParams: string = location.search.split("?")[1]
    return !(searchParams === undefined || searchParams.trim() === "")
}