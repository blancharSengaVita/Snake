import {BodyItem} from "./BodyItem";
import {Canvas} from "../framework-2023/Canvas";
import {settings} from "../settings";
import {Animatable} from "../framework-2023/Types/Animatable";
import {Position} from "../framework-2023/Types/Position";
import {Direction} from "../framework-2023/Types/Direction";
import {Apple} from "./Apple";
import {compare} from "../Helpers/compare";
import {Score} from "../framework-2023/GameDisplay/Score";
import {GameStatus} from "../framework-2023/Types/GameStatus";

export class Snake implements Animatable {
    public tail: BodyItem[];
    private readonly canvas: Canvas;
    private position: Position;
    private readonly current: { direction: Direction };
    private readonly apples: Apple[];
    private readonly foodCanvas: Canvas;
    private readonly score: Score;
    private readonly forms: HTMLFormElement;
    private readonly gameStatus: GameStatus;
    private formText: HTMLElement;

    constructor(canvas: Canvas, current: { direction: Direction }, apples: Apple[], foodCanvas: Canvas, score: Score, forms: HTMLFormElement, gameStatus: GameStatus) {
        this.apples = apples;
        this.canvas = canvas;
        this.current = current;
        this.foodCanvas = foodCanvas;
        this.score = score;
        this.forms = forms;
        this.gameStatus = gameStatus;
        this.tail = [];
        this.formText = document.querySelector(settings.forms.messageSelector)
    }

    createSnake() {
        for (let i = 0; i < settings.snake.initialCount; i++) {
            this.tail.push(new BodyItem(
                this.canvas,
                {
                    x: (this.canvas.width / 2) - Math.floor(settings.snake.initialCount / 2 * settings.snake.unit) + Math.floor(settings.snake.unit * i) + 1,
                    y: this.canvas.height / 2 + 1
                }));
        }
    }

    clear(): void {
        this.tail.forEach((bodyItem) => {
            bodyItem.clear();
        });
    }

    draw(): void {
        this.tail.forEach((bodyItem) => {
            bodyItem.draw();
        });
    }

    update(): void {
        this.tail.shift();

        this.position = {
            x: this.tail[this.tail.length - 1].position.x,
            y: this.tail[this.tail.length - 1].position.y
        };

        switch (this.current.direction) {
            case Direction.right:
                this.position.x += settings.snake.unit;
                break;
            case Direction.left:
                this.position.x -= settings.snake.unit;
                break;
            case Direction.up:
                this.position.y += settings.snake.unit;
                break;
            case Direction.down:
                this.position.y -= settings.snake.unit;
                break;
        }

        this.tail.push(new BodyItem(this.canvas, {
                x: this.position.x,
                y: this.position.y,
            }
        ));

        this.isEating();
        this.isBittingHisTail();
        this.isGoingOutside();
    }

    private isEating() {
        if (compare({
            x: this.apples[0].position.x - 10,
            y: this.apples[0].position.y - 10
        }, this.tail[this.tail.length - 1].position)) {
            this.apples[0].clear();
            this.apples[0] = new Apple(this.foodCanvas);
            this.apples[0].draw();
            this.score.increment();
            this.isGrowing();
        }
    }

    private isGrowing() {
        const newPosition = {
            x: this.tail[this.tail.length - 1].position.x,
            y: this.tail[this.tail.length - 1].position.y
        };

        switch (this.current.direction) {
            case Direction.right:
                newPosition.x += settings.snake.unit;
                break;
            case Direction.left:
                newPosition.x -= settings.snake.unit;
                break;
            case Direction.up:
                newPosition.y += settings.snake.unit;
                break;
            case Direction.down:
                newPosition.y -= settings.snake.unit;
                break;
        }

        this.tail.push(new BodyItem(this.canvas, {
            x: newPosition.x,
            y: newPosition.y,
        }));
    }

    private isBittingHisTail() {
        if (this.tail.length > 0) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                if (compare(this.tail[i].position, this.tail[this.tail.length - 1].position)) {
                    this.resetGame(settings.forms.messages.selfEating);
                }
            }
        }
    }

    private isGoingOutside() {
        if (this.tail[this.tail.length -1].position.x > this.canvas.width || this.tail[this.tail.length -1].position.y > this.canvas.width  || this.tail[this.tail.length -1].position.x < 0 || this.tail[this.tail.length -1].position.y < 0 ){
            this.resetGame(settings.forms.messages.goOut);
        }
    }

    private resetGame(resetText : string){
        this.gameStatus.start = false;
        this.forms.classList.remove(settings.forms.hideClass);
        this.formText.textContent = resetText;
    }
}