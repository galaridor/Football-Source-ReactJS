import { useEffect, useState } from "react";

export const usePagination = () => {
	const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
    }, [totalCount])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setItemsPerPage(newPageSize);
    };

	return {
        currentPage,
        itemsPerPage,
        totalPages,
        setTotalCount,
        handlePageChange,
        handlePageSizeChange
	};
};