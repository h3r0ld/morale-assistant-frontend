import { Language } from './language';

export class Joke {
    id: number;
    language: Language;
    text: string;
    soundFile: any;
    created: Date;
    lastModified: Date;

    embedded?: string;
    shareURL?: string;


    constructor(text: string, language: Language) {
        this.text = text;
        this.language = language;
    }
}
