import {settings} from "../settings";
import {IDrawable} from "../Interfaces/IDrawable";
import {Square} from "./Square";
import {Birdie} from "./Birdie";
import {detectSquareCollision} from "../Helpers/helpers";
import {Score} from "./Score";

export class Wall implements IDrawable {
    private readonly size: number;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvasElement: HTMLCanvasElement;
    private readonly birdie: Birdie;
    private readonly score: Score;
    private squares: Square[];
    private hit: boolean;
    private value: number;

    constructor(context2D: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement, size: number, birdie: Birdie, score: Score) {
        this.ctx = context2D;
        this.size = size;
        this.canvasElement = canvasElement;
        this.birdie = birdie;
        this.score = score;
        this.initSquares();
    }

    private initSquares() {
        this.squares = [];
        this.hit = false;
        const random = Math.floor(Math.random() * 10) + 1;
        switch (random) {
            case 1:
                this.value = settings.wall.maxValue;
                // 2 en haut et 2 en bas
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: settings.background.gap
                }, this.size, settings.wall.backgroundColor));
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: settings.background.gap * 2 + this.size
                }, this.size, settings.wall.backgroundColor));
                break;
            case 2:
                this.value = settings.wall.maxValue;
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: this.canvasElement.height - settings.background.gap - this.size
                }, this.size, settings.wall.backgroundColor));

                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: this.canvasElement.height - settings.background.gap * 2 - this.size * 2
                }, this.size, settings.wall.backgroundColor));
                break;
            case 3:
            case 4:
            case 5:
                this.value = settings.wall.minValue;
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: this.canvasElement.height - settings.background.gap - this.size
                }, this.size, settings.wall.backgroundColor));
                break
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this.value = settings.wall.minValue;
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: this.canvasElement.width,
                    y: settings.background.gap
                }, this.size, settings.wall.backgroundColor));
                break;
        }
    }

    public draw(): void {
        this.squares.forEach((square: Square) => {
            square.draw();
            this.ctx.font = "bolder 48px Helvetica Neue";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = settings.wall.color;
            this.ctx.fillText(`+${this.value}`, square.position.x + (this.size / 2), square.position.y + (this.size / 2));
        });
    }


    public animate() {
        this.detectCollisions()
        this.clear();
        if (this.squares[0].position.x < -this.size) {
            if (!this.hit) {
                this.score.increment(this.value * this.squares.length);
            }
            this.initSquares();
        } else {
            this.squares.forEach((square: Square) => {
                square.position.x -= settings.wall.speed;
            });
        }
        this.draw();
    }

    clear(): void {
        this.squares.forEach((square: Square) => {
            square.clear();
        });
    }

    private detectCollisions() {
        for (let i = 0; i < this.squares.length; i++) {
            if (detectSquareCollision(this.birdie.position, this.squares[i].position, this.size)) {
                this.value = 0;
                this.hit = true;
            }
        }
    }

}
