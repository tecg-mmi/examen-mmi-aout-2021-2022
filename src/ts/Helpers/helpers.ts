import {position} from "../Types/position";


export function detectSquareCollision(rect1: position, rect2: position, size: number): boolean {
    return rect1.x < rect2.x + size &&
        rect1.x + size > rect2.x &&
        rect1.y < rect2.y + size &&
        size + rect1.y > rect2.y;
}