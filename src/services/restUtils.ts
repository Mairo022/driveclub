export function buildRequestParams(filter: IPageRequest): string {
    const {page, size, sort, direction} = filter
    const paramsMap = new Map<IRequestParams, string>()
    let params = ""

    if (page != null) paramsMap.set("page", String(page))
    if (size != null) paramsMap.set("size", String(size))
    if (sort != null && direction != null) paramsMap.set("sort", sort + ',' + direction ?? '')

    paramsMap.forEach((value, key) => {
        if (params === "")
            params = "" + key + "=" + value
        else
            params += "&" + key + "=" + value
    })

    return params;
}