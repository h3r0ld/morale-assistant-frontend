import { Language } from './language';

export class Joke {
    id: number;
    text: string;
    soundFile: any;
    language: Language;

    constructor(text: string, language: Language) {
        this.text = text;
        this.language = language;
    }
}
