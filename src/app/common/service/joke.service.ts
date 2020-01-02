import { Language } from '../model/language';
import { Joke } from '../model/joke';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JokeService {

    constructor(private httpClient: HttpClient) { }

    getNextJoke(language: Language): Observable<any> {
        return this.httpClient.get('https://sv443.net/jokeapi/category/Miscellaneous');
    }
}
