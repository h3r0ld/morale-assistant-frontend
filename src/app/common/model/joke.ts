import { Language } from './language';

export class Joke {
    id: number;
    text: String;
    soundFile: any;
    language: Language;

    constructor(text: String, language: Language) {
        this.text = text;
        this.language = language;
    }
}