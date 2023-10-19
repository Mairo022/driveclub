import "./pagination.scss"
import { ReactElement } from "react";
import {TABLE_PAGES} from "../../data/constants";

export function Pagination(props: IPagination): ReactElement {
    const pagination = props.pagination
    const pagesTotal = pagination.totalPages - 1
    const pageNow = pagination.number
    const handlePaging = props.handlePaging

    const pages: number[] = generatePageNumbers(pageNow, pagesTotal, TABLE_PAGES)

    const className = (pageInput: number): string => pageInput === pagination.number+1 ? "page page--active" : "page"

    function generatePageNumbers(pageNow: number, pagesTotal: number, pagesShown: number): number[] {
        let startPage: number, endPage: number
        const pages = new Array<number>()
        const toSides = Math.floor(pagesShown/2)

        const lessPagesInFirstHalf = pageNow - toSides < 0
        const lessPagesInSecondHalf = pageNow + toSides > pagesTotal

        if (lessPagesInFirstHalf) {
            startPage = 1
            endPage = pagesShown
        } else if (lessPagesInSecondHalf) {
            startPage = pagesTotal - pagesShown + 2
            endPage = pagesTotal + 1
        } else {
            startPage = pageNow - toSides + 1
            endPage = pageNow + toSides + 1
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    return (
        <div className="pagination">
            <button className="step"
                    disabled={pageNow === 0}
                    onClick={() => {handlePaging(0)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/><path d="M24 24H0V0h24v24z" fill="none"/>
                </svg>
            </button>
            <button className="step"
                    disabled={pageNow === 0}
                    onClick={() => {handlePaging(pageNow-1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>{

            pages.map((page, i) => (
                <button className={className(page)} key={i} onClick={() => {handlePaging(page-1)}}>
                    {page}
                </button>
            ))}

            <button className="step"
                    disabled={pageNow === pagesTotal}
                    onClick={() => {handlePaging(pageNow+1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
            <button className="step"
                    disabled={pageNow === pagesTotal}
                    onClick={() => {handlePaging(pagesTotal)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
                </svg>
            </button>
        </div>
    )
}