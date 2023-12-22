type ISortDirection = 'asc' | 'desc';
type IRequestParams = "page" | "size" | "sort"

interface IPageResponse<T> extends IPaginationSB {
    content: T;
}

interface IPaginationSB {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number
}

interface IPageRequest {
    page: number;
    size: number;
    sort?: string;
    direction?: ISortDirection;
}