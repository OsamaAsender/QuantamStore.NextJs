export interface PaginationProps {
    page: number;
    total: number;
    pageSize: number;
    setPage: (page: number) => void;
  }