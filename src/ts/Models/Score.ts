export class Score {
    private element: HTMLElement;
    private _score: number;
    private best: HTMLElement;

    constructor(score: HTMLElement, best: HTMLElement) {
        this.element = score;
        this._score = 0;
        this.best = best;
    }

    increment(value: number) {
        this._score += value;
        this.element.textContent = this._score.toString();
    }

    clear() {
        if (parseInt(this.best.textContent) < this._score) {
            this.best.textContent = `${this._score}`;
        }
        this._score = 0;
        this.increment(0);
    }

}