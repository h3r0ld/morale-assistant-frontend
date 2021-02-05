export class BackendError {
    title?: string;
    details?: string;
}

export class BackendErrorResponse {
    errors: BackendError[] = [];
}