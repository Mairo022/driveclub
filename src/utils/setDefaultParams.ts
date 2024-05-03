export default (queryParams: URLSearchParams, filterDefaults: IPageRequest) => {
    const filterDefaultsKeys = Object.keys(filterDefaults) as Array<keyof IPageRequest>
    const missingParams: Array<keyof IPageRequest> = filterDefaultsKeys.filter(
        key => !queryParams.has(key) && key !== "direction"
    )

    if (missingParams.length > 0) {
        missingParams.forEach((key) => {
            queryParams.set(key, String(filterDefaults[key]))
        })

        if (missingParams.includes("sort")) {
            const sortParam = filterDefaults["sort"] + "," + filterDefaults["direction"]
            queryParams.set("sort", sortParam)
        }
    }
}