import { Paging } from './paging';

export class PagedResponse<T> {
    public content: T[];
    public paging: Paging;
}
