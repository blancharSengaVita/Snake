import {Position} from "../framework-2023/Types/Position";

export function compare(p1: Position, p2: Position): boolean {
    return p1.x === p2.x && p1.y === p2.y;
}