import {settings} from "../settings";
import {Canvas} from "../framework-2023/Canvas";
import {Snake} from "../Models/Snake";
import {Animation} from "../Models/Animation";
import {GameStatus} from "../framework-2023/Types/GameStatus";
import {Direction} from "../framework-2023/Types/Direction";
import {Apple} from "../Models/Apple";
import {Score} from "../framework-2023/GameDisplay/Score";

export class Game {
    private readonly forms: HTMLFormElement;
    private readonly snakeCanvas: Canvas;
    private readonly snake: Snake;
    private readonly gameStatus: GameStatus;
    private readonly animation: Animation;
    private readonly current: { direction: Direction };
    private apples: Apple[];
    private readonly foodCanvas: Canvas;
    private score: Score;

    constructor() {
        this.addEventListener();
        this.forms = document.querySelector(settings.forms.domSelector);
        this.snakeCanvas = new Canvas(document.querySelector(settings.canvas.snake.domSelector), {
            height: settings.canvas.size.height,
            width: settings.canvas.size.width
        });
        this.foodCanvas = new Canvas(document.querySelector(settings.canvas.food.domSelector), {
            height: settings.canvas.size.height,
            width: settings.canvas.size.width
        });


        this.score = new Score(document.querySelector(settings.score.domSelector))
        this.current = {direction: Direction.right};

        this.apples = [];
        this.apples.push(new Apple(this.foodCanvas));
        this.apples.forEach((apple) => {
            apple.draw();
        });

        this.gameStatus = {start: false}

        this.snake = new Snake(this.snakeCanvas, this.current, this.apples, this.foodCanvas, this.score, this.forms, this.gameStatus);

        this.animation = new Animation(this.gameStatus);
        this.animation.addAnimatable(this.snake);
    }

    private addEventListener() {
        window.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();
            this.reset();
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            e.preventDefault();
            switch (e.key) {
                case 'ArrowDown':
                    if (this.current.direction !== Direction.down) {
                        this.current.direction = Direction.up;
                    }
                    break;
                case 'ArrowUp':
                    if (this.current.direction !== Direction.up) {
                        this.current.direction = Direction.down;
                    }
                    break;
                case 'ArrowRight':
                    if (this.current.direction !== Direction.left) {
                        this.current.direction = Direction.right;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.current.direction !== Direction.right) {
                        this.current.direction = Direction.left;
                    }
                    break;
            }
        });
    }

    private reset() {
        this.forms.classList.add(settings.forms.hideClass);
        this.resetApple();
        this.resetSnake();
        this.gameStatus.start = true;
        this.animation.animate();
    }

    private resetApple() {
        this.apples[0].clear();
        this.apples[0] = new Apple(this.foodCanvas);
        this.apples[0].draw();
    }

    private resetSnake(){
        this.current.direction = Direction.right;
        this.score.reset();
        this.snake.clear();
        this.snake.tail = [];
        this.snake.createSnake();
        this.snake.draw();
    }
}