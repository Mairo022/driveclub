export function buildRequestParams(filter: IPageRequest): string {
    const paramsMap = new Map<string, string | number>()
    let params = ""

    Object.entries(filter).forEach(([key, value]) => {
        paramsMap.set(key, value)
    })

    if (paramsMap.has("direction") && paramsMap.has("sort")) {
        paramsMap.set("sort", paramsMap.get("sort") + ',' + paramsMap.get("direction"))
    }
    paramsMap.delete("direction")

    paramsMap.forEach((value, key) => {
        if (params === "")
            params = "" + key + "=" + value
        else
            params += "&" + key + "=" + value
    })

    return params;
}