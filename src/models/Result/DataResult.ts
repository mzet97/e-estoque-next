import PagedResult from './PagedResult';

type DataResult<T> = {
    data: Array<T>;
    pagedResult: PagedResult;
    success: string;
    message: string;
};

export default DataResult;
