import {settings} from "../settings";
import {Wall} from "../Models/Wall";
import {Animation} from "../Animation";
import {Background} from "../Models/Background";
import {Birdie} from "../Models/Birdie";
import {Score} from "../Models/Score";

export class Game {
    private readonly birdieCanvas: HTMLCanvasElement;
    private readonly birdieCtx: CanvasRenderingContext2D;
    private readonly backgroundCanvas: HTMLCanvasElement;
    private readonly backgroundCxt: CanvasRenderingContext2D;
    private readonly wallCanvas: HTMLCanvasElement;
    private readonly wallCxt: CanvasRenderingContext2D;
    private readonly background: Background;
    private readonly wall: Wall;
    private readonly itemSize: number;
    private readonly animation: Animation;
    private readonly birdie: Birdie;
    private readonly score: Score;
    private playing: Boolean = false;

    constructor() {
        this.birdieCanvas = document.querySelector(settings.birdie.selector);
        this.birdieCtx = this.birdieCanvas.getContext('2d');
        this.backgroundCanvas = document.querySelector(settings.background.selector);
        this.backgroundCxt = this.backgroundCanvas.getContext('2d');
        this.wallCanvas = document.querySelector(settings.wall.selector);
        this.wallCxt = this.wallCanvas.getContext('2d');
        this.background = new Background(this.backgroundCanvas, this.backgroundCxt);
        this.score = new Score(document.querySelector(settings.score.selector), document.querySelector(settings.score.best.selector))
        this.itemSize = Math.trunc((this.birdieCanvas.width - (settings.background.numberOfItemsPerLine + 1) * settings.background.gap) / settings.background.numberOfItemsPerLine);
        this.birdie = new Birdie(this.birdieCtx, this.birdieCanvas, {
            x: settings.background.gap,
            y: this.birdieCanvas.height / 2 - this.itemSize / 2
        }, this.itemSize, settings.wall.backgroundColor, this.score);
        this.animation = new Animation();
        this.animation.addIDrawable(this.birdie);
        this.background.draw();
        this.birdie.draw();
        this.wall = new Wall(this.wallCxt, this.wallCanvas, this.itemSize, this.birdie, this.score);
        this.animation.addIDrawable(this.wall);
        this.addEventListeners();
    }

    private addEventListeners() {
        window.addEventListener('keyup', () => {
            if (!this.playing) {
                this.playing = true;
                this.animation.animate();
            } else {
                this.birdie.goUp();
            }
        });
    }
}