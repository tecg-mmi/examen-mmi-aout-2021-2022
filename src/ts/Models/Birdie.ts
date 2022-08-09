import {position} from "../Types/position";
import {Square} from "./Square";
import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Score} from "./Score";

export class Birdie extends Square implements IDrawable {
    // La force naturelle à laquelle l'oiseau est soumis.
    private gravity = settings.birdie.gravity;
    // La vitesse avec laquelle l'oiseau tombe.
    private velocity = 0;
    // La force qui fait remonter l'oiseau
    private lift = settings.birdie.lift;
    private readonly score: Score;


    constructor(gameCtx: CanvasRenderingContext2D, gameCanvas: HTMLCanvasElement, position: position, size: number, color: string, score: Score) {
        super(gameCtx, gameCanvas, position, size, color);
        this.score = score;
    }

    animate(): void {
        this.clear();
        this.velocity += this.gravity;
        this.velocity *= settings.birdie.velocityConstraint
        this.position.y += this.velocity;
        if (this.position.y > this.htmlCanvasElement.height - settings.background.gap) {
            this.score.clear();
            this.position.y = this.htmlCanvasElement.height - settings.background.gap;
            this.velocity = 0;
        } else if (this.position.y < settings.background.gap) {
            this.score.clear()
            this.position.y = settings.background.gap;
            this.velocity = 0;
        }
        this.position.y = Math.trunc(this.position.y);
        this.draw();
    }

    goUp() {
        this.velocity += this.lift;
    }

}