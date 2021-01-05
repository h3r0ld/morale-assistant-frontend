import { Language } from '../model/language';
import { Joke } from '../model/joke';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';

@Injectable()
export class JokeService {

    constructor(private httpClient: HttpClient) { }

    getNextJoke(language: Language): Observable<any> {
        return this.httpClient.get('https://sv443.net/jokeapi/category/Miscellaneous');
    }

    getJokes(): Observable<Joke[]> {
        const jokes = [];
        for (let i = 0; i < 30; i++) {
            jokes.push(this.createDummyJoke(45678 + i));
        }
        return of(jokes);
    }

    private createDummyJoke(id: number): Joke {
        return {
            id,
            text: `This is joke no. ${id}.`,
            language: Language.EN,
            soundFilePath: `tmp/asd/${id}.wav`,
            soundFile: null,
            lastModified: new Date()
        } as Joke;
    }
}
