import { Language } from '../model/language';
import { Joke } from '../model/joke';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PagedResponse } from '../model/paged-response';
import { JokeSearchRequest } from '../model/joke-search-request';
import { environment } from 'src/environments/environment';

@Injectable()
export class JokeService {
    constructor(private httpClient: HttpClient) { }

    saveJoke(joke: Joke) {
        return this.httpClient.post(`${environment.apiUrl}/admin/joke`, { text: joke.text, language: joke.language });
    }

    updateJoke(joke: Joke) {
        return this.httpClient.put(`${environment.apiUrl}/admin/joke/${joke.id}`, { text: joke.text, language: joke.language });
    }

    deleteJoke(joke: Joke) {
        return this.httpClient.delete(`${environment.apiUrl}/admin/joke/${joke.id}`);
    }

    searchJokes(request: JokeSearchRequest): Observable<PagedResponse<Joke>> {
        return this.httpClient.post<PagedResponse<Joke>>(`${environment.apiUrl}/admin/joke/search`, request);
    }

    getRandomJoke(language: Language): Observable<Joke> {
        return this.httpClient.get<Joke>(`${environment.apiUrl}/morale-boost/random/${language}`);
    }
}
