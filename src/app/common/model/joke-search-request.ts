import { Language } from "./language";
import { PagedRequest } from "./paged-request";

export class JokeSearchRequest extends PagedRequest {
    public text?: string | null;
    public language?: Language | null;
}