import {Circle} from "../framework-2023/Shapes/Circle";
import {Canvas} from "../framework-2023/Canvas";
import {settings} from "../settings";
import {Random} from "../framework-2023/Helpers/Random";

export class Apple extends Circle{

    constructor(canvas : Canvas) {
        super({
            canvas: canvas,
            color: settings.food.color,
            position: {
                x: Random.nextInt(0, Math.floor(canvas.width/(settings.food.radius * 2))) * (settings.food.radius*2) - settings.food.radius + 1,
                y: Random.nextInt(0, Math.floor(canvas.height/(settings.food.radius * 2))) * (settings.food.radius*2) - settings.food.radius + 1,
            },
            radius: settings.food.radius
        });
    }

    generateRandomPostion(){
        return Random.nextInt(0, Math.floor(this.canvas.width/(settings.food.radius * 2)));
    }

    reset(){
        this.clear();
        this.position.x = Random.nextInt(0, Math.floor(this.canvas.width/(settings.food.radius * 2))) * (settings.food.radius*2) + settings.food.radius + 1;
        this.position.y = Random.nextInt(0, Math.floor(this.canvas.width/(settings.food.radius * 2))) * (settings.food.radius*2) + settings.food.radius + 1
        this.draw();
    }
}