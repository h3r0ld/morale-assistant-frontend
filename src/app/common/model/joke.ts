import { Language } from './language';

export class Joke {
    id: number;
    language: Language;
    text: string;
    soundFilePath: string;
    soundFile: any;
    lastModified: Date;

    constructor(text: string, language: Language) {
        this.text = text;
        this.language = language;
    }
}
