import { JokeDto } from '../client/public';

export class Joke implements JokeDto {
    id?: string;
    language: JokeDto.LanguageEnum;
    text: string;
    soundFile?: any;
    created?: string;
    lastModified?: string;

    embedded?: string;
    shareURL?: string;

    constructor(text: string, language: JokeDto.LanguageEnum) {
        this.text = text;
        this.language = language;
    }
}
