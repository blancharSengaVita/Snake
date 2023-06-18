import {Square} from "../framework-2023/Shapes/Square";
import {ISquare} from "../framework-2023/Types/ISquare";
import {Position} from "../framework-2023/Types/Position";
import {settings} from "../settings";
import {Canvas} from "../framework-2023/Canvas";

export class BodyItem extends Square{
   public readonly position: Position;

    constructor (canvas : Canvas, position : Position) {
        super({
            canvas: canvas,
            color: settings.snake.color,
            position: position,
            side: settings.snake.unit
        });
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = settings.snake.borderColor;
        this.ctx.fillStyle = `${this.color}`;
        this.ctx.rect(this.position.x + this.ctx.lineWidth, this.position.y + this.ctx.lineWidth, this.side - this.ctx.lineWidth, this.side - this.ctx.lineWidth);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clear(){
        this.ctx.clearRect(this.position.x, this.position.y, this.side, this.side);
    }
}