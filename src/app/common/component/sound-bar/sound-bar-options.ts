export class SoundBarOptions {
    hideAutoplay: boolean;

    constructor(hideAutoplay: boolean) {
        this.hideAutoplay = hideAutoplay;
    }

    static build() {
        return new SoundBarOptions(false);
    }

    hiddenAutoplay(hideAutoplay: boolean) {
        this.hideAutoplay = hideAutoplay;
        return this;
    }
}
