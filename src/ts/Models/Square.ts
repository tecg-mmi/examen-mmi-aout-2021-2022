import {position} from "../Types/position";
import {settings} from "../settings";
import {IDrawable} from "../Interfaces/IDrawable";

export class Square {
    public position: position;
    private size: number
    private ctx: CanvasRenderingContext2D;
    protected htmlCanvasElement: HTMLCanvasElement;
    public color: string;

    constructor(gameCtx: CanvasRenderingContext2D, gameCanvas: HTMLCanvasElement, position: position, size: number, color: string) {
        this.ctx = gameCtx;
        this.size = size;
        this.color = color;
        this.htmlCanvasElement = gameCanvas;
        this.position = position;
    }

    public draw(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }


    clear(): void {
        this.ctx.clearRect(this.position.x, this.position.y, this.size, this.size);
    }
}
