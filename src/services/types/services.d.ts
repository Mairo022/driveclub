export type ISortDirection = 'asc' | 'desc' | '';

export interface IPageResponse<T> {
    content: T;
    totalElements: number;
    number: number;
    totalPages: number;
}

export interface IPageRequest {
    pageIndex: number;
    pageSize: number;
    sort: string;
    direction: ISortDirection;
}