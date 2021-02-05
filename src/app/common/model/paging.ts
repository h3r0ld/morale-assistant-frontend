export class Page {
    public pageIndex: number;
    public pageSize: number;
}

export class Paging extends Page {
    public totalPages: number;
    public totalElements: number;
}
