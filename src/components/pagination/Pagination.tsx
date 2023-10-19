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
                <svg strokeWidth={20} stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512">
                    <path d="m297.2 478 20.7-21.6L108.7 256 317.9 55.6 297.2 34 65.5 256l231.7 222zM194.1 256 425.8 34l20.7 21.6L237.3 256l209.2 200.4-20.7 21.6-231.7-222z" />
                </svg>
            </button>
            <button className="step"
                    disabled={pageNow === 0}
                    onClick={() => {handlePaging(pageNow-1)}}>
                <svg strokeWidth={0.8} stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                    <path d="M17.2 23.7 5.4 12 17.2.3l1.3 1.4L8.4 12l10.1 10.3z" />
                </svg>
            </button>{

            pages.map((page, i) => (
                <button className={className(page)} key={i} onClick={() => {handlePaging(page-1)}}>
                    {page}
                </button>
            ))}

            <button className="step"
                    disabled={pageNow === pagesTotal}
                    onClick={() => {handlePaging(pageNow+1)}}>
                <svg strokeWidth={0.8} stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                    <path d="M6.8 0.3 18.6 12 6.8 23.7 5.5 22.3 15.6 12 5.5 1.7z" />
                </svg>
            </button>
            <button className="step"
                    disabled={pageNow === pagesTotal}
                    onClick={() => {handlePaging(pagesTotal)}}>
                <svg strokeWidth={20} stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512">
                    <path d="m297.2 478 20.7-21.6L108.7 256 317.9 55.6 297.2 34 65.5 256l231.7 222zM194.1 256 425.8 34l20.7 21.6L237.3 256l209.2 200.4-20.7 21.6-231.7-222z" transform="rotate(180 256 256)" />
                </svg>
            </button>
        </div>
    )
}