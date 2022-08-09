import {settings} from "../settings";
import {Square} from "./Square";

export class Background {
    private readonly canvasElement: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly squares: Square[];
    private itemSize: number;

    constructor(backgroundCanvas: HTMLCanvasElement, backgroundCtx: CanvasRenderingContext2D) {
        this.canvasElement = backgroundCanvas;
        this.ctx = backgroundCtx;
        this.squares = [];
        this.itemSize = Math.trunc((this.canvasElement.width - (settings.background.numberOfItemsPerLine + 1) * settings.background.gap) / settings.background.numberOfItemsPerLine);
        for (let j = 0; j < settings.background.numberOfItemsPerLine; j++) {
            for (let i = 0; i < settings.background.numberOfItemsPerLine; i++) {
                this.squares.push(new Square(this.ctx, this.canvasElement, {
                    x: settings.background.gap * (i + 1) + this.itemSize * i,
                    y: settings.background.gap * (j + 1) + this.itemSize * j
                }, this.itemSize, settings.background.color))
            }
        }
    }

    draw() {
        this.squares.forEach((square: Square) => {
            square.draw();
        });
    }


}