import {settings} from "../settings";
import {Animatable} from "../framework-2023/Types/Animatable";
import {Snake} from "./Snake";
import {GameStatus} from "../framework-2023/Types/GameStatus";

export class Animation {
    private readonly iDrawables: Animatable[];
    private readonly status: { start: boolean };
    private last: DOMHighResTimeStamp;
    private now: DOMHighResTimeStamp;

    constructor(status: GameStatus) {
        this.iDrawables = [];
        this.last = performance.now();
        this.now = performance.now();
        this.status = status;
    }

    addAnimatable(iDrawable: Animatable) {
        this.iDrawables.push(iDrawable);
    }

    animate() {
        if (this.status.start) {
            if (this.now - this.last > 1000 / settings.canvas.fps) {
                this.iDrawables.forEach((iDrawable: Animatable) => {
                    iDrawable.clear();
                    iDrawable.update();
                    iDrawable.draw();
                });
                this.last = this.now;
            }
            this.now = performance.now();
            window.requestAnimationFrame(() => {
                this.animate();
            });
        }
    }

}