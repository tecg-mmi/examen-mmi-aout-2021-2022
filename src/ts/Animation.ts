import {IDrawable} from "./Interfaces/IDrawable";

export class Animation {
    private readonly iDrawables: IDrawable[];

    constructor() {
        this.iDrawables = [];
    }

    addIDrawable(iDrawable: IDrawable) {
        this.iDrawables.push(iDrawable);
    }

    animate() {
        window.requestAnimationFrame(() => {
            this.iDrawables.forEach((drawable: IDrawable) => {
                drawable.animate();
            });
            this.animate();
        });
    }
}